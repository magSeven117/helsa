import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import banner1 from '@/assets/images/onboarding/banner1.png';
import banner2 from '@/assets/images/onboarding/banner2.png';
import banner3 from '@/assets/images/onboarding/banner3.png';
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
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
      }}
    >
      <Text>Hola</Text>
    </SafeAreaView>
  );
};

export default Welcome;
