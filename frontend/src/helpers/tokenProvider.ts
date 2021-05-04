import { BACKEND } from '../constants';

export const createTokenProvider = () => {
  let token: { accessToken: string, refreshToken: string } | null = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || '') || null;
  let isUpdating = false;
  let resolvers = [];

  const getExpirationDate = (jwtToken?: string): number | null => {
    if (!jwtToken) return null;

    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    return jwt && jwt.exp && jwt.exp * 1000 || null;
  };

  const isExpired = (exp?: number | null) => {
    if (!exp) return false;

    return Date.now() > exp;
  };

  const checkExpiry = async () => {
    if (!token) return null;

    if (isExpired(getExpirationDate(token.accessToken))) {
      const updateToken = await fetch(`${BACKEND}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: token.refreshToken })
      }).then(r => r.json());

      setToken(updateToken);
    }
  }

  const getToken = async () => {
    if (isUpdating) {
      return new Promise(resolve => {
        resolvers.push(resolve);
      });
    }

    await checkExpiry();




    return token && token.accessToken;
  };

  const isLoggedIn = () => !!token;

  let observers: Array<(isLogged: boolean) => void> = [];

  const subscribe = (observer: (isLogged: boolean) => void) => {
    observers.push(observer);
  };

  const unsubscribe = (observer: (isLogged: boolean) => void) => {
    observers = observers.filter(o => o !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach(observer => observer(isLogged));
  };

  const setToken = (newToken: typeof token) => {
    if (newToken) {
      localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(newToken));
    } else {
      localStorage.removeItem('REACT_TOKEN_AUTH');
    }

    token = newToken;
    notify();
  };

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe
  };
};
