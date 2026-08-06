'use server'

import { createAuthClient } from "better-auth/react"
import { auth } from "./auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const { useSession } = createAuthClient()

export const signUp = async (name: string, email: string, password: string) => {
    const result = await auth.api.signUpEmail({
        body: {
            name, 
            email, 
            password, 
            callbackURL: "/dashboard"
        }
    })

    return result;
}

export const signIn = async (email: string, password: string) => {
    const result = await auth.api.signInEmail({
        body: {
            email, 
            password, 
            callbackURL: "/dashboard"
        }
    })

    return result;
}

export const signInSocial = async (provider: "github" | "google") => {
    const {url} = await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: "/dashboard"
        }
    })

    if (url) {
        redirect(url)
    };
}

export const signOut = async () => {
    const result = await auth.api.signOut({headers: await headers()});

    if (result) {
        redirect('/auth');
    }

    return result;
}