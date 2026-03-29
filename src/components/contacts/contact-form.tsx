'use client';

import { Input } from '@next-template/ui/components/ui/input';
import { Label } from '@next-template/ui/components/ui/label';
import { Textarea } from '@next-template/ui/components/ui/textarea';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import {
  type ContactFormState,
  createContactAction,
  updateContactAction,
} from '@/app/actions/contact-actions';
import { InlineAlert } from '@/components/ui/inline-alert';
import type { Contact } from '@/types/contact';
import { SubmitButton } from './submit-button';

interface ContactFormProps {
  mode: 'create' | 'edit';
  contact?: Contact;
}

const initialState: ContactFormState = { success: false };

export const ContactForm = ({ mode, contact }: ContactFormProps) => {
  const action = mode === 'create' ? createContactAction : updateContactAction;
  const [state, formAction] = useActionState(action, initialState);
  const tf = useTranslations('contactForm');

  return (
    <form action={formAction} className="space-y-6">
      {state.error && <InlineAlert variant="error" message={state.error} />}

      {mode === 'edit' && contact && <input type="hidden" name="id" value={contact.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="photo">{tf('photoUrl')}</Label>
          <Input
            id="photo"
            name="photo"
            type="url"
            defaultValue={contact?.photo}
            placeholder="https://images.unsplash.com/..."
            required
          />
          {state.fieldErrors?.photo && (
            <p className="text-sm text-destructive">{state.fieldErrors.photo[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">{tf('name')}</Label>
          <Input
            id="name"
            name="name"
            defaultValue={contact?.name}
            placeholder={tf('name')}
            required
          />
          {state.fieldErrors?.name && (
            <p className="text-sm text-destructive">{state.fieldErrors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{tf('email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={contact?.email}
            placeholder="name@example.com"
            required
          />
          {state.fieldErrors?.email && (
            <p className="text-sm text-destructive">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">{tf('city')}</Label>
          <Input
            id="city"
            name="city"
            defaultValue={contact?.city}
            placeholder={tf('city')}
            required
          />
          {state.fieldErrors?.city && (
            <p className="text-sm text-destructive">{state.fieldErrors.city[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">{tf('stateProvince')}</Label>
          <Input
            id="state"
            name="state"
            defaultValue={contact?.state}
            placeholder={tf('optional')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">{tf('country')}</Label>
          <Input
            id="country"
            name="country"
            defaultValue={contact?.country}
            placeholder={tf('country')}
            required
          />
          {state.fieldErrors?.country && (
            <p className="text-sm text-destructive">{state.fieldErrors.country[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{tf('phone')}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={contact?.phone}
            placeholder="+1 (555) 000-0000"
            required
          />
          {state.fieldErrors?.phone && (
            <p className="text-sm text-destructive">{state.fieldErrors.phone[0]}</p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="notes">{tf('notes')}</Label>
          <Textarea
            id="notes"
            name="notes"
            defaultValue={contact?.notes}
            placeholder={tf('optional')}
            rows={3}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton>{mode === 'create' ? tf('createContact') : tf('saveChanges')}</SubmitButton>
      </div>
    </form>
  );
};
