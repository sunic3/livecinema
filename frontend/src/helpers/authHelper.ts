import { createAuthProvider } from './authProvider';

export const { useAuth, authFetch, login, logout } = createAuthProvider();
