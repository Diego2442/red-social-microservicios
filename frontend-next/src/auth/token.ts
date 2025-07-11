import { cookies } from "next/headers";

export default async function getToken() {
    const token = (await cookies()).get
    ('RED_SOCIAL_TOKEN')?.value

    return token
}