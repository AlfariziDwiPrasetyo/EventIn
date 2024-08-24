import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(300, "Description must be less than 300 characters"),
  location: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(300, "Location must be less than 300 characters"),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
});
