import { BACKEND } from '../constants';

export const getUsername: (
  first_name: string | null,
  username: string
) => string = (first_name, userName) => first_name || userName.split('@')[0];

export const getAvatar: (photo: string | null) => string = (photo) =>
  (photo && (photo.startsWith('http') ? photo : `${BACKEND}${photo}`)) ||
  '/photo.jpg';
