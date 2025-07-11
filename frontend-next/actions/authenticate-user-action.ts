"use server"

import { ErrorResponseSchema, LoginSchema } from "@/src/schema"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type ActionStateType = {
    errors: string[]
}

export async function authenticateUser(prevState: ActionStateType, formData: FormData) {
    const loginCredentials = {
        user_name: formData.get('user_name'),
        password: formData.get('password')
    }
    
    const auth = LoginSchema.safeParse(loginCredentials)
    
    if(!auth.success){
        return {
            errors: auth.error.issues.map(issue => issue.message)
        }
    }

    const url = `${process.env.API_URL}/api/auth/login`
    console.log(url)
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_name: auth.data.user_name,
            password: auth.data.password
        })
    })
    const res = await req.json()
  
    if(!req.ok){
        const {error} = ErrorResponseSchema.parse(res)
        return {
            errors: [error]
        }
    }

    (await cookies()).set({
        name: 'RED_SOCIAL_TOKEN',
        value: res.token,
        httpOnly: true,
        path: '/'
    })

    redirect('/posts')
}