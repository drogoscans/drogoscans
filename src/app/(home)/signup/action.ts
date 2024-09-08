"use server";

import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(255, "Password must be at most 255 characters"),
});

export async function register(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = registerSchema.safeParse({ email, password });
    if (!result.success) {
        const errorMessage = result.error.errors.map((e) => e.message).join(", ");
        return { error: errorMessage };
    }

    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })
    if (existingUser) {
        return { error: "Email already in use" }
    }

    const newUser = await prisma.user.create({
        data: {
            email, password: passwordHash
        }
    })

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/");
}
