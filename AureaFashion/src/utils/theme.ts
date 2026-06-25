export const Colors = {
  noir: '#1a1a1a',
  stone: '#f5f3ef',
  blush: '#e8c4b8',
  blushDark: '#c4846e',
  ink: '#3d3935',
  mist: '#9a9691',
  white: '#ffffff',
  success: '#3b6d11',
  successBg: '#eaf3de',
  danger: '#e24b4a',
  border: '#e8e5e0',
};

export const Typography = {
  displayLarge: { fontSize: 28, fontWeight: '500' as const, color: Colors.noir },
  displayMedium: { fontSize: 22, fontWeight: '500' as const, color: Colors.noir },
  titleLarge: { fontSize: 18, fontWeight: '500' as const, color: Colors.noir },
  titleMedium: { fontSize: 16, fontWeight: '500' as const, color: Colors.noir },
  titleSmall: { fontSize: 14, fontWeight: '500' as const, color: Colors.noir },
  bodyLarge: { fontSize: 15, fontWeight: '400' as const, color: Colors.ink },
  bodyMedium: { fontSize: 14, fontWeight: '400' as const, color: Colors.ink },
  bodySmall: { fontSize: 13, fontWeight: '400' as const, color: Colors.ink },
  caption: { fontSize: 11, fontWeight: '400' as const, color: Colors.mist },
  overline: { fontSize: 11, fontWeight: '500' as const, color: Colors.mist, letterSpacing: 1.5, textTransform: 'uppercase' as const },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  modal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
};
