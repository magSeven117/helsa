import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background-third py-5">
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default Profile;
