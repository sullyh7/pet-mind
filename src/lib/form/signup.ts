import { z } from "zod"
 
export const signUpFormSchema = z.object({
    firstName: z.string().min(1, {message: "First name must be longer."}).max(50),
    lastName: z.string().min(2, {message: "Last name must be longer."}).max(50),
    email: z.string().email("This is not a valid email."),
    password: z.string().min(5, {message: "Password length must be at least 5 characters."}).max(50)
})

export const becomeAMinderFormSchema = z.object({
    firstName: z.string().min(1, {message: "First name must be longer."}).max(50),
    lastName: z.string().min(2, {message: "Last name must be longer."}).max(50),
    email: z.string().email("This is not a valid email."),
    password: z.string().min(5, {message: "Password length must be at least 5 characters."}).max(50),
    location: z.string().min(3, {message: "Location invalid."}),
    description: z.string().min(10, {message: "Write a bit more about yourself!"}).max(200, {message:"Too long"})
})