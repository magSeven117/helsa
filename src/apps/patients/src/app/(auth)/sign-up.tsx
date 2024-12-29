import { authClient } from '@helsa/auth/mobile';
import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const handleLogin = async () => {
    console.log('login');
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/(root)/(tabs)/home', // this will be converted to a deep link (eg. `myapp://dashboard`) on native
    });
  };
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background py-5">
      <Text>SignUp</Text>
      <Button onPress={handleLogin} title="SignUp wit google" />
    </SafeAreaView>
  );
};

export default SignUp;
