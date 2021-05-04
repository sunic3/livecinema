import { BACKEND } from '../constants';

export type TokenType = { access: string, refresh: string } | null;

const tokenProvider = () => {
  let token: TokenType = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || "null") || null;
  let isUpdating = false;
  let resolvers: ((value: unknown) => void)[] = [];

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
    if (!token) return;

    if (isExpired(getExpirationDate(token.access))) {
      await fetch(`${BACKEND}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: token.refresh })
      }).then(r => r.json()).then(
        updateToken => {
          setToken(updateToken);
          resolvers.forEach(resolver => resolver(updateToken.access));
        },
        _ => {
          setToken(null);
          resolvers.forEach(resolver => resolver(null));
        }
      );

      isUpdating = false;
      resolvers = [];
    }
  };

  const getToken = async () => {
    if (isUpdating) {
      return new Promise(resolve => {
        resolvers.push(resolve);
      });
    }

    await checkExpiry();

    return Promise.resolve(token && token.access);
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

  const setToken = (newToken: TokenType) => {
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

export default tokenProvider;
