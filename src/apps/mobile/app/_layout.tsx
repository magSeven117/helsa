import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AnimationScreen } from '@/components/shared/animated-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect, useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appReady, setAppReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [loaded, error] = useFonts({
    Nunito: require('@/assets/fonts/Nunito-Regular.ttf'),
    NunitoBold: require('@/assets/fonts/Nunito-Bold.ttf'),
    NunitoSemiBold: require('@/assets/fonts/Nunito-SemiBold.ttf'),
    NunitoExtraBold: require('@/assets/fonts/Nunito-ExtraBold.ttf'),
    NunitoLight: require('@/assets/fonts/Nunito-Light.ttf'),
    NunitoMedium: require('@/assets/fonts/Nunito-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();

      setAppReady(true);
    }
  }, [loaded]);

  if (!appReady || !animationFinished) {
    return (
      <AnimationScreen
        appReady={appReady}
        finish={(isCanceled: boolean) => {
          if (!isCanceled) {
            setAnimationFinished(true);
          }
        }}
      />
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(300)}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </Animated.View>
    </ThemeProvider>
  );
}
