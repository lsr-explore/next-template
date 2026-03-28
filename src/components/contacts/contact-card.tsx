'use client';

import { Button } from '@next-template/ui/components/ui/button';
import { Card, CardContent } from '@next-template/ui/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@next-template/ui/components/ui/collapsible';
import { cn } from '@next-template/ui/lib/utils';
import { ChevronDown, Clock, Mail, MapPin, Pencil, Phone, StickyNote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatTimezoneDisplay } from '@/lib/timezone';
import type { Contact } from '@/types/contact';
import { DeleteContactDialog } from './delete-contact-dialog';

interface ContactCardProps {
  contact: Contact;
  isEditor: boolean;
  onDelete: (id: string) => void;
}

export const ContactCard = ({ contact, isEditor, onDelete }: ContactCardProps) => {
  const [notesOpen, setNotesOpen] = useState(false);

  const locationParts = [contact.city, contact.state, contact.country].filter(Boolean);
  const locationString = locationParts.join(', ');

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Image
            src={contact.photo}
            alt={`Photo of ${contact.name}`}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-medium text-base">{contact.name}</h2>
            <div className="mt-1 space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                <a href={`mailto:${contact.email}`} className="truncate hover:text-foreground">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                <a href={`tel:${contact.phone}`} className="hover:text-foreground">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{locationString}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{formatTimezoneDisplay(contact.timezone)}</span>
              </div>
            </div>
          </div>
        </div>

        {contact.notes && (
          <Collapsible open={notesOpen} onOpenChange={setNotesOpen} className="mt-3">
            <CollapsibleTrigger
              render={<Button variant="ghost" size="sm" className="w-full justify-between" />}
            >
              <span className="flex items-center gap-1.5">
                <StickyNote className="size-3.5" aria-hidden="true" />
                Notes
              </span>
              <ChevronDown
                className={cn('size-3.5 transition-transform', notesOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-1 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
              {contact.notes}
            </CollapsibleContent>
          </Collapsible>
        )}

        {isEditor && (
          <div className="mt-3 flex items-center justify-end gap-2 border-t pt-3">
            <Button
              variant="ghost"
              size="sm"
              render={<Link href={`/contacts/${contact.id}/edit`} />}
            >
              <Pencil className="size-3.5" aria-hidden="true" />
              Edit
            </Button>
            <DeleteContactDialog
              contactName={contact.name}
              onConfirm={() => onDelete(contact.id)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
