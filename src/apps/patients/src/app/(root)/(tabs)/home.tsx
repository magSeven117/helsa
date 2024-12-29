import { authClient } from '@helsa/auth/mobile';
import { router } from 'expo-router';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background-third py-5">
      <Text>Home</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          authClient.signOut();
          router.push('/(auth)/welcome');
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
