export type UserRole = 'viewer' | 'editor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface PresetAccount {
  email: string;
  password: string;
  user: User;
}

export const PRESET_USERS: Record<UserRole, PresetAccount> = {
  viewer: {
    email: 'viewer@example.com',
    password: 'ContactsViewer123',
    user: { id: '1', name: 'Alex Reader', email: 'viewer@example.com', role: 'viewer' },
  },
  editor: {
    email: 'editor@example.com',
    password: 'ContactsEditor123',
    user: { id: '2', name: 'Sam Editor', email: 'editor@example.com', role: 'editor' },
  },
};
