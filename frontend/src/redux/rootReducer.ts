import { combineReducers } from 'redux';

import { AuthFormType, ThemeType } from '../interfaces';
import { DARK_THEME, LIGHT_THEME, THEME_CHANGE } from '../constants';
import { ActionsType, AuthFormActionType, AuthFormTypes } from './actions';

export interface Store {
  theme: ThemeType;
  authForm: AuthFormType;
}

const initialTheme = (localStorage.getItem('theme') ||
  LIGHT_THEME) as ThemeType;

function themeReducer(state: ThemeType = initialTheme, action: ActionsType) {
  switch (action.type) {
    case THEME_CHANGE: {
      const newTheme: ThemeType =
        state === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
      localStorage.setItem('theme', newTheme);

      return newTheme;
    }
    default:
      return state;
  }
}

function authFormReducer(
  state: AuthFormType = {
    show: false,
    resolvers: [],
  },
  action: AuthFormActionType
) {
  switch (action.type) {
    case AuthFormTypes.OPEN: {
      return { show: true, resolvers: state.resolvers };
    }
    case AuthFormTypes.CLOSE: {
      return { show: false, resolvers: state.resolvers };
    }
    case AuthFormTypes.ADD_RESOLVER: {
      return {
        show: state.show,
        resolvers: [...state.resolvers, action.payload],
      };
    }
    case AuthFormTypes.RESET: {
      state.resolvers.forEach((resolver) => resolver());
      return { show: state.show, resolvers: [] };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  theme: themeReducer,
  authForm: authFormReducer,
});

export default rootReducer;
