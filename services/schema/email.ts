import { z } from 'zod';

export const createEmailSchema = z.object({
    to: z.email(),
    from: z.email(),
    subject: z.string(),
    body: z.string(),
})

export type CreateEmailSchema = z.infer<typeof createEmailSchema>