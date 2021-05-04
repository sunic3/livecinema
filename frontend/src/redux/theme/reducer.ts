import { DARK_THEME, LIGHT_THEME, THEME_CHANGE } from '../../constants';
import { ThemeType } from '../../interfaces';
import { ThemeActionsType } from './actions';

const initialTheme = (localStorage.getItem('theme') ||
  LIGHT_THEME) as ThemeType;

export default function themeReducer(
  state: ThemeType = initialTheme,
  action: ThemeActionsType
) {
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
