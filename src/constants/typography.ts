import { Platform } from 'react-native';
import { moderateScale } from '@/utils/scale';

const fontFamily = Platform.select({ ios: 'System', android: 'Roboto', default: 'System' });

export const Typography = {
  h1: { fontSize: moderateScale(24), fontWeight: '700' as const, fontFamily, lineHeight: moderateScale(32), letterSpacing: -0.5 },
  h2: { fontSize: moderateScale(20), fontWeight: '600' as const, fontFamily, lineHeight: moderateScale(28), letterSpacing: -0.3 },
  h3: { fontSize: moderateScale(18), fontWeight: '600' as const, fontFamily, lineHeight: moderateScale(24) },
  h4: { fontSize: moderateScale(16), fontWeight: '600' as const, fontFamily, lineHeight: moderateScale(22) },
  
  body: { fontSize: moderateScale(14), fontWeight: '400' as const, fontFamily, lineHeight: moderateScale(20) },
  bodyBold: { fontSize: moderateScale(14), fontWeight: '600' as const, fontFamily, lineHeight: moderateScale(20) },
  
  caption: { fontSize: moderateScale(12), fontWeight: '400' as const, fontFamily, lineHeight: moderateScale(16) },
  captionBold: { fontSize: moderateScale(12), fontWeight: '600' as const, fontFamily, lineHeight: moderateScale(16) },
  
  small: { fontSize: moderateScale(10), fontWeight: '500' as const, fontFamily, lineHeight: moderateScale(14) },
  
  navValue: { fontSize: moderateScale(28), fontWeight: '700' as const, fontFamily, lineHeight: moderateScale(34), letterSpacing: -1 },
  
  button: { fontSize: moderateScale(16), fontWeight: '600' as const, fontFamily, letterSpacing: 0.5 },
  badge: { fontSize: moderateScale(11), fontWeight: '600' as const, fontFamily, letterSpacing: 0.2 },
} as const;
