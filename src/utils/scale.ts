import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

export const scale = (size: number) => (width / BASE_WIDTH) * size;
export const verticalScale = (size: number) => (height / BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
