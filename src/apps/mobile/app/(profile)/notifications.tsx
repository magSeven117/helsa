import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Notifications = () => {
  return (
    <View
      style={{ flex: 1, backgroundColor: '#8167ec', width: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: '#fff' }}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Notifications;
