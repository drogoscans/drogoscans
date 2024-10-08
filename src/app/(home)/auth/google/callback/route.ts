import { cookies } from "next/headers"
import { OAuth2RequestError } from "arctic";
import { google, lucia } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("google_oauth_state")?.value ?? null;
    const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

    if (
        !code ||
        !state ||
        !storedState ||
        state !== storedState ||
        !codeVerifier
    ) {
        return new Response(null, {
            status: 400,
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(
            code,
            codeVerifier
        );
        const response = await fetch(
            "https://openidconnect.googleapis.com/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            }
        );
        const googleUser: GoogleUser = await response.json();

        const existingUser = await prisma.user.findUnique({
            where: { googleAuthId: googleUser.sub }
        })
        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            );
            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/",
                },
            });
        }

        const newUser = await prisma.user.create({
            data: {
                username: googleUser.name,
                contactEmail: googleUser.email,
                googleAuthId: googleUser.sub,
                image: googleUser.picture
            }
        })

        const session = await lucia.createSession(newUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
        );
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    } catch (e) {
        console.log(e);
        // the specific error message depends on the provider
        if (e instanceof OAuth2RequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}

interface GoogleUser {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
}