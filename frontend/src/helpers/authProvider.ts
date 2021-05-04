import { useEffect, useState } from 'react';

import createTokenProvider, { TokenType } from './tokenProvider';

export const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const login: (newToken: TokenType) => void = (newToken) => {
    tokenProvider.setToken(newToken);
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const authFetch = async (): Promise<string> => {
    const token = await tokenProvider.getToken() as string;

    return token ? Promise.resolve(token) : Promise.reject(new Error('no token'));
  };

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged: boolean) => {
        setIsLogged(newIsLogged);
      };

      tokenProvider.subscribe(listener);

      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isLogged] as [typeof isLogged];
  };

  return {
    useAuth,
    authFetch,
    login,
    logout,
  };
};
