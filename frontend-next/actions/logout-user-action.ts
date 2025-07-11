"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout() {
    (await cookies()).delete('RED_SOCIAL_TOKEN')
    redirect('/auth/login')
}