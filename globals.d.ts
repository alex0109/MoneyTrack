import { DarkTheme, LightTheme } from './app/shared/assets/styles/colors';

declare module '@react-navigation/native' {
  export function useTheme(): LightTheme | DarkTheme;
}
