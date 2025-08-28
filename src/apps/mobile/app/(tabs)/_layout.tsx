import { Tabs } from 'expo-router';
import React from 'react';

import { AnimationScreen } from '@/components/shared/animated-screen';
import TabBar from '@/components/shared/tab-bar';
import { authClient } from '@helsa/auth/mobile';

export default function TabLayout() {
  const { isPending, data } = authClient.useSession();

  if (isPending && !data) {
    return <AnimationScreen appReady={!isPending} finish={() => console.log('Cancelled')} />;
  }

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Protected guard={!!data}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            title: 'Agenda',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="health"
          options={{
            title: 'Salud',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Doctores',
            headerShown: false,
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
