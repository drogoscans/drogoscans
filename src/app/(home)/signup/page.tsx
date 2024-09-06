import { PrismaClient } from '@prisma/client'
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";

const prisma = new PrismaClient()

export default async function Page() {
    return (
        <div>
            <h1>Create an account</h1>
            <form action={signup}>
                <label htmlFor="email">Username</label>
                <input name="email" id="email" type='email'/>
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button type='submit'>Continue</button>
            </form>
            <a href="/auth/google">Login With Google</a>

        </div>
    )
}

// async function signup(_: any, formData: FormData): Promise<ActionResult> {}

interface ActionResult {
    error: string;
}

async function signup(formData: FormData): Promise<ActionResult> {
    "use server";
    console.log('heelo');
    
    const email = formData.get("email") as string
    console.log('mdnvkjnsdv');
    
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    // if (
    //     typeof email !== "string" ||
    //     email.length < 3 ||
    //     email.length > 31 ||
    //     !/^[a-z0-9_-]+$/.test(email)
    // ) {
    //     console.log('1');
    //     return {
    //         error: "Invalid email"
    //     };
    // }
    const password = formData.get("password") as string
    // if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    //     console.log(password);
    //     console.log(typeof password);

    //     return {
    //         error: "Invalid password"
    //     };
    // }

    console.log('knsdvn');
    
    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    console.log({email, password});
    


    // TODO: check if username is already used
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return {
            error: "Email already in use"
        };
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