// Tokens de diseño centralizados: colores, espacios, radios, tipografía y sombra
import { Platform } from 'react-native';

export const colors = {
  background: '#F5F7FA',
  surface: '#FFFFFF',
  primary: '#E3350D',
  primaryDark: '#B8280A',
  primarySoft: '#FDE8E4',
  accent: '#3B4CCA',
  success: '#2A9D8F',
  danger: '#D62828',
  text: '#1A1A2E',
  textMuted: '#6B7280',
  border: '#E5E7EB',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  full: 999,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
  },
  secondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textMuted,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
};

// Platform.select: sombra nativa distinta en iOS (shadow*) y Android (elevation)
export const shadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  android: {
    elevation: 3,
  },
});

export default {
  colors,
  spacing,
  radius,
  typography,
  shadow,
};
