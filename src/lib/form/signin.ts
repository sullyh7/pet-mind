import { z } from "zod"
 
export const signInFormSchema = z.object({
    email: z.string().email("This is not a valid email."),
    password: z.string().min(5, {message: "Password length must be at least 5 characters."}).max(50)
})