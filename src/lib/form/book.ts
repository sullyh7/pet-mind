import { z } from "zod"
 
export const bookFormSchema = z.object({
    date: z.date(),
    duration: z.coerce.number().min(1, {message: "Bookings are one hour minimum"}).max(10, {message: "You can only book up to 10 hours in one slot."}),
    pet: z.string(),
})