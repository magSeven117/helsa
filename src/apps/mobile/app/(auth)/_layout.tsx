import { Stack } from 'expo-router';
import 'react-native-reanimated';
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'fade_from_bottom',
        animationDuration: 10,
        contentStyle: { flex: 1, backgroundColor: '#FFF' },
      }}
    >
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="verify-email" options={{ headerShown: false }} />
      <Stack.Screen name="registered" options={{ headerShown: false }} />
    </Stack>
  );
}
