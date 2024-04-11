import { z } from "zod"
 
export const reviewFormSchema = z.object({
    text: z.string().min(10, {message: "Review must be at least 10 characters."}),
    rating: z.coerce.number().min(0).max(5),
})