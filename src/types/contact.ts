import { z } from 'zod/v4';

export const contactSchema = z.object({
  id: z.string(),
  photo: z.url('Must be a valid URL'),
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  timezone: z.string(),
  phone: z
    .string()
    .min(7, 'Phone must be at least 7 characters')
    .regex(/^[\d\s\-()+]+$/, 'Invalid phone format'),
  notes: z.string().optional(),
});

export const contactFormSchema = contactSchema.omit({ id: true, timezone: true });

export type Contact = z.infer<typeof contactSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
