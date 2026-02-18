import { Platform } from 'react-native';

const baseFont = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'System',
});

const boldFont = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
  default: 'System',
});

export const FONTS = {
  regular: baseFont,
  bold: boldFont,
};
