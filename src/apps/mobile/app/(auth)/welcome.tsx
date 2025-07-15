import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
const onboarding = [
  {
    id: 1,
    image: (
      <LottieView
        style={{
          width: 300,
          height: 300,
        }}
        source={require('@/assets/animations/Meditation.json')}
        autoPlay
        loop={true}
      />
    ),
    title: 'Construye tu bienestar',
    description: 'Descubre una plataforma integral para el cuidado de la salud mental y física.',
  },
  {
    id: 2,
    image: (
      <LottieView
        style={{
          width: 300,
          height: 300,
        }}
        source={require('@/assets/animations/mobile.json')}
        autoPlay
        loop={true}
      />
    ),
    title: 'Accesible en la palma de tu mano',
    description: 'Lleva tu salud mental y física contigo a donde vayas, con nuestra aplicación móvil.',
  },
  {
    id: 3,
    image: (
      <LottieView
        style={{
          width: 300,
          height: 300,
        }}
        source={require('@/assets/animations/better-mental.json')}
        autoPlay
        loop={true}
      />
    ),
    title: 'Encuentra tu equilibrio',
    description: 'Conéctate con profesionales de la salud mental y física para mejorar tu bienestar integral.',
  },
];
const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skip_button} onPress={() => router.replace('/(auth)/sign-in')}>
        <Text style={styles.skip_text}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={styles.dot_swiper} />}
        activeDot={<View style={styles.active_dot_swiper} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            {item.image}
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: '#000',
                  marginHorizontal: 40,
                  fontFamily: 'NunitoBold',
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: '#0E0E0E',
                marginHorizontal: 40,
                fontFamily: 'NunitoSemiBold',
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.main_button} onPress={() => router.replace('/(auth)/sign-in')}>
          <Text style={{ color: '#fff', fontFamily: 'NunitoBold' }}>{isLastSlide ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8167EC',
    paddingVertical: 20,
  },
  skip_button: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
  },
  skip_text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'NunitoBold',
  },
  dot_swiper: {
    width: 32,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginHorizontal: 1,
  },
  active_dot_swiper: {
    width: 32,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
    marginHorizontal: 1,
  },
  main_button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default Welcome;
