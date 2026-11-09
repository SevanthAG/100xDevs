import z from "zod";

export const createUserSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const createAvatarSchema = z.object({
    name: z.string(),
    imageUrl: z.string(),
})