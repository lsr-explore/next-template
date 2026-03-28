import 'server-only';
import type { Contact, ContactFormData } from '@/types/contact';
import { seedContacts } from './seed-data';
import { getTimezoneFromLocation } from './timezone';

const contacts = new Map<string, Contact>();

const initStore = () => {
  if (contacts.size === 0) {
    for (const contact of seedContacts) {
      contacts.set(contact.id, contact);
    }
  }
};

initStore();

let nextId = 100;

const generateId = (): string => {
  nextId += 1;
  return `c${nextId}`;
};

export const getAllContacts = (): Contact[] => {
  return Array.from(contacts.values());
};

export const getContactById = (id: string): Contact | undefined => {
  return contacts.get(id);
};

export const searchContacts = (query: string): Contact[] => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) {
    return getAllContacts();
  }

  return getAllContacts().filter(
    (contact) =>
      contact.name.toLowerCase().includes(normalizedQuery) ||
      contact.email.toLowerCase().includes(normalizedQuery) ||
      contact.city.toLowerCase().includes(normalizedQuery) ||
      contact.country.toLowerCase().includes(normalizedQuery) ||
      contact.phone.includes(normalizedQuery),
  );
};

export const createContact = (data: ContactFormData): Contact => {
  const id = generateId();
  const timezone = getTimezoneFromLocation(data.city, data.country);
  const contact: Contact = { ...data, id, timezone };
  contacts.set(id, contact);
  return contact;
};

export const updateContact = (id: string, data: ContactFormData): Contact | undefined => {
  const existing = contacts.get(id);
  if (!existing) {
    return undefined;
  }

  const timezone = getTimezoneFromLocation(data.city, data.country);
  const updated: Contact = { ...existing, ...data, timezone };
  contacts.set(id, updated);
  return updated;
};

export const deleteContact = (id: string): boolean => {
  return contacts.delete(id);
};
