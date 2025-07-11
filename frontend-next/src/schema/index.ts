import z from 'zod'


export const LoginSchema = z.object({
    user_name: z.string()
    .min(1, {message: 'El Username es Obligatorio'}),
    password: z.string()
    .min(1, {message: 'El Password no puede ir vacio'})
})

export const UserSchema = z.object({
        id: z.number(),
        user_name: z.string(),
        full_name: z.string(),
        birth_date: z.string(),
})

export const SendPostSchema = z.object({
    content: z.string().min(1, {message: 'No has escrito nada en el contenido'}),
})

export const PostSchema = z.object({
    id: z.number(),
    content: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    user_id: z.number()

})

export const SuccessSchema = z.object({
    message: z.string()
})

export const PostsResponeSchema = z.object({
    totalItems: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    posts: z.array(PostSchema)
})

export const ErrorResponseSchema = z.object({
    error: z.string()
})


export type User = z.infer<typeof UserSchema>
export type Post = z.infer<typeof PostSchema>