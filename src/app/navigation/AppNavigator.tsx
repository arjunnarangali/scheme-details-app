import { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SchemeDetailsScreen } from '@/screens/SchemeDetailsScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigatorComponent = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SchemeDetails" component={SchemeDetailsScreen} />
  </Stack.Navigator>
);

export const AppNavigator = memo(AppNavigatorComponent);
