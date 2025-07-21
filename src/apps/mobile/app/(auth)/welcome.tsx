import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
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
            Bienvenido =)
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
          Hola,
        </Text>
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
          Estamos felices de que estés aquí!
        </Text>
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
          Descubre una plataforma integral para el cuidado de la salud mental y física.
        </Text>
        <LottieView
          style={{
            width: 300,
            height: 300,
          }}
          source={require('@/assets/animations/Meditation.json')}
          autoPlay
          loop={true}
        />
      </View>
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.main_button} onPress={() => router.push('/(auth)/sign-up')}>
          <Text style={{ color: '#fff', fontFamily: 'NunitoBold' }}>Crear cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.second_button} onPress={() => router.push('/(auth)/sign-in')}>
          <Text style={{ color: '#fff', fontFamily: 'NunitoBold' }}>Iniciar Sesion</Text>
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
    flex: 1,
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
    backgroundColor: 'transparent',
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  second_button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default Welcome;
