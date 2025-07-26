import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Registered = () => {
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
            Hay mucho por descubrir y aprender, así que prepárate para una experiencia increíble.
          </Text>
          <LottieView
            style={{
              width: 300,
              height: 300,
            }}
            source={require('@/assets/animations/success_animation.json')}
            autoPlay
          />
        </View>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.second_button} onPress={() => router.push('/(tabs)')}>
          <Text style={{ color: '#fff', fontFamily: 'NunitoBold' }}>Ir al inicio</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Registered;

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
