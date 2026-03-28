import 'server-only';
import type { Contact } from '@/types/contact';

export const seedContacts: Contact[] = [
  {
    id: 'c1',
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brazil',
    timezone: 'America/Sao_Paulo',
    phone: '+55 11 9876-5432',
    notes: 'Product designer with expertise in accessibility. Prefers async communication.',
  },
  {
    id: 'c2',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    name: 'James Chen',
    email: 'james.chen@example.com',
    city: 'San Francisco',
    state: 'CA',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    phone: '+1 (415) 555-0142',
    notes: 'Frontend architect. Available for pair programming sessions on Tuesdays.',
  },
  {
    id: 'c3',
    photo:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    name: 'Emma Johansson',
    email: 'emma.johansson@example.com',
    city: 'Stockholm',
    country: 'Sweden',
    timezone: 'Europe/Stockholm',
    phone: '+46 70 123 4567',
  },
  {
    id: 'c4',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    name: 'Amir Patel',
    email: 'amir.patel@example.com',
    city: 'Mumbai',
    state: 'MH',
    country: 'India',
    timezone: 'Asia/Kolkata',
    phone: '+91 98765 43210',
    notes: 'Backend lead. Manages the payments team. Best reached before 3 PM IST.',
  },
  {
    id: 'c5',
    photo:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.com',
    city: 'Paris',
    country: 'France',
    timezone: 'Europe/Paris',
    phone: '+33 6 12 34 56 78',
    notes: 'UX researcher. Runs monthly usability testing sessions.',
  },
  {
    id: 'c6',
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    name: 'David Kim',
    email: 'david.kim@example.com',
    city: 'Toronto',
    state: 'ON',
    country: 'Canada',
    timezone: 'America/Toronto',
    phone: '+1 (416) 555-0198',
  },
  {
    id: 'c7',
    photo:
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@example.com',
    city: 'Tokyo',
    country: 'Japan',
    timezone: 'Asia/Tokyo',
    phone: '+81 90 1234 5678',
    notes: 'Mobile developer. Working on the React Native migration.',
  },
  {
    id: 'c8',
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face',
    name: 'Oliver Wright',
    email: 'oliver.wright@example.com',
    city: 'London',
    country: 'United Kingdom',
    timezone: 'Europe/London',
    phone: '+44 7700 900123',
    notes:
      'DevOps engineer. On-call rotation every other week. Ping on Slack for urgent infra issues.',
  },
  {
    id: 'c9',
    photo:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
    name: 'Fatima Al-Hassan',
    email: 'fatima.alhassan@example.com',
    city: 'Dubai',
    country: 'United Arab Emirates',
    timezone: 'Asia/Dubai',
    phone: '+971 50 123 4567',
  },
  {
    id: 'c10',
    photo:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
    name: 'Carlos Rivera',
    email: 'carlos.rivera@example.com',
    city: 'Mexico City',
    country: 'Mexico',
    timezone: 'America/Mexico_City',
    phone: '+52 55 1234 5678',
    notes: 'QA lead. Coordinates cross-team testing sprints.',
  },
];
