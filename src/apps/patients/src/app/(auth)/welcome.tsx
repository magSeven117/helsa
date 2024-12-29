import banner1 from '@/src/assets/images/brand/banner1.png';
import banner2 from '@/src/assets/images/brand/banner2.png';
import banner3 from '@/src/assets/images/brand/banner3.png';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const onboarding = [
  {
    id: 1,
    image: banner1,
    title: 'Your Personalized Healthcare Assistant',
    description: 'Get personalized health tips, reminders, and recommendations based on your health profile.',
  },
  {
    id: 2,
    image: banner2,
    title: 'Track Your symptoms',
    description: 'Keep track of your symptoms, medications, and appointments in one place.',
  },
  {
    id: 3,
    image: banner3,
    title: 'Control al your agenda an patients',
    description: 'Manage your appointments, prescriptions, and medical records with ease.',
  },
];

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-background-third py-5">
      <TouchableOpacity
        className="w-full flex justify-end items-end p-5"
        onPress={() => {
          router.replace('/(auth)/sign-up');
        }}
      >
        <Text className="text-black text-md font-bold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={index} className="flex items-center justify-center p-5">
            <Image source={item.image} className="w-full h-[300px]" resizeMode="contain" />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl mx-10 text-center font-NunitoBold">{item.title}</Text>
            </View>
            <Text className="text-md font-NunitoSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <Button
        onPress={() => (isLastSlide ? router.push('/(auth)/sign-up') : swiperRef.current?.scrollBy(1))}
        className="w-11/12 mt-10"
        title={isLastSlide ? 'Get Started' : 'Next'}
      ></Button>
    </SafeAreaView>
  );
};

export default Welcome;
