"use server"

import getToken from "@/src/auth/token"
import { SendPostSchema, SuccessSchema, User } from "@/src/schema"
import { revalidatePath, revalidateTag } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}



export async function createPost(prevState: ActionStateType, formData: FormData) {
    const token = await getToken()

    const dataPost = {
        content: formData.get('content')
    }

    const postsend = SendPostSchema.safeParse(dataPost)

    if(!postsend.success) {
        const errors = postsend.error.issues.map(issue => issue.message)

        return {
            errors,
            success: ''
        }
    }

    const url = `${process.env.API_URL}/api/posts`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({content: postsend.data.content})
    })
    const res = await req.json()
    
    const success = SuccessSchema.parse(res)
    revalidateTag('posts')

    return {
        errors: [],
        success: success.message
    }

}