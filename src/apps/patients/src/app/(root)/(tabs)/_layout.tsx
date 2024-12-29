import { Tabs } from 'expo-router';
import { CircleDollarSign, LucideCalendar, LucideLayoutDashboard, LucideStethoscope } from 'lucide-react-native';
import React from 'react';

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: '#dfcbfa',
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#0E0E0E',
          borderRadius: 20,
          paddingBottom: 0,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tabs.Screen
        name="doctors"
        options={{
          title: 'Doctors',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => <LucideStethoscope size={25} color={focused ? '#8167EC' : 'white'} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => <LucideCalendar size={25} color={focused ? '#8167EC' : 'white'} />,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => <LucideLayoutDashboard size={25} color={focused ? '#8167EC' : 'white'} />,
        }}
      />
      <Tabs.Screen
        name="billing"
        options={{
          title: 'Billing',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => <CircleDollarSign size={25} color={focused ? '#8167EC' : 'white'} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;
