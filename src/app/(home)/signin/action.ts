"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be at most 255 characters"),
});

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    const errorMessage = result.error.errors.map((e) => e.message).join(", ");
    return { error: errorMessage };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "Incorrect email" }
  }

  const isValidPassword = await verify(existingUser.password!, password)
  if (!isValidPassword) {
    console.error("Login Error: Incorrect email or password");
    return { error: "Incorrect password" };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/");
}
