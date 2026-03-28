'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireEditor } from '@/lib/auth-session';
import { createContact, deleteContact, updateContact } from '@/lib/contact-store';
import { contactFormSchema } from '@/types/contact';

export interface ContactFormState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

const parseFormData = (formData: FormData) => ({
  photo: formData.get('photo') as string,
  name: formData.get('name') as string,
  email: formData.get('email') as string,
  city: formData.get('city') as string,
  state: (formData.get('state') as string) || undefined,
  country: formData.get('country') as string,
  phone: formData.get('phone') as string,
  notes: (formData.get('notes') as string) || undefined,
});

export const createContactAction = async (
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> => {
  try {
    await requireEditor();
  } catch {
    return { success: false, error: 'You do not have permission to create contacts.' };
  }

  const raw = parseFormData(formData);
  const result = contactFormSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] = fieldErrors[key] ?? [];
      fieldErrors[key].push(issue.message);
    }
    return { success: false, fieldErrors };
  }

  createContact(result.data);
  revalidatePath('/contacts');
  redirect('/contacts');
};

export const updateContactAction = async (
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> => {
  try {
    await requireEditor();
  } catch {
    return { success: false, error: 'You do not have permission to edit contacts.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { success: false, error: 'Contact ID is missing.' };
  }

  const raw = parseFormData(formData);
  const result = contactFormSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] = fieldErrors[key] ?? [];
      fieldErrors[key].push(issue.message);
    }
    return { success: false, fieldErrors };
  }

  const updated = updateContact(id, result.data);
  if (!updated) {
    return { success: false, error: 'Contact not found.' };
  }

  revalidatePath('/contacts');
  redirect('/contacts');
};

export const deleteContactAction = async (formData: FormData): Promise<ContactFormState> => {
  try {
    await requireEditor();
  } catch {
    return { success: false, error: 'You do not have permission to delete contacts.' };
  }

  const id = formData.get('id') as string;
  if (!id) {
    return { success: false, error: 'Contact ID is missing.' };
  }

  const deleted = deleteContact(id);
  if (!deleted) {
    return { success: false, error: 'Contact not found.' };
  }

  revalidatePath('/contacts');
  return { success: true };
};
