import "server-only"//Esto hace que el código se quede solo en el servidor y no se vaya al cliente
import { cache } from "react"
import { redirect } from "next/navigation"
import getToken from "./token"
import { UserSchema } from "../schema"

//Data Access Layer
export const verifySession = cache(async () => {
   
    const token = await getToken()

    if(!token) {
        redirect('/auth/login')
    }

    const url = `${process.env.API_URL}/api/auth/user`
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const res = await req.json()
    const data_validated = UserSchema.safeParse(res)

    if(!data_validated.success){
        redirect('/auth/login')
    }

    return {
        user: data_validated.data,
        is_auth: true
    }
})
