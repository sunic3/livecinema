import { THEME_CHANGE } from '../../constants';

export type ThemeActionsType = ThemeChangeType;

export type ThemeChangeType = {
  type: typeof THEME_CHANGE;
};

export const themeChange: ThemeChangeType = {
  type: THEME_CHANGE,
};
