import logoHelsa from '@/assets/images/logo-complete-black.png';
import { authClient } from '@helsa/auth/mobile';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { Angry, Bell, BookMarked, Brain, ChevronRight, Frown, Laugh, Meh, Smile } from 'lucide-react-native';
import React, { useRef } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockAppointments = [
  {
    id: '1',
    title: 'Cita con el Dr. Smith',
    date: '2023-10-01',
    time: '10:00 AM',
  },
  {
    id: '2',
    title: 'Cita con la Dra. Johnson',
    date: '2023-10-02',
    time: '11:00 AM',
  },
  {
    id: '3',
    title: 'Cita con el Dr. Brown',
    date: '2023-10-03',
    time: '12:00 PM',
  },
];

export default function HomeScreen() {
  const { data } = authClient.useSession();
  const animation = useRef<LottieView>(null);
  const [mood, setMood] = React.useState<string | null>(null);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', gap: 20 }}
        style={{ flex: 1, width: '100%', paddingHorizontal: 16, paddingTop: 16 }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <TouchableOpacity
              onPress={() => router.push('/(profile)')}
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#8167ec',
                borderRadius: 1000,
                overflow: 'hidden',
              }}
            >
              <Image src={data?.user.image ?? ''} style={{ height: 50, width: 50 }} resizeMode="contain" />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 16, fontFamily: 'NunitoSemiBold', fontWeight: 800 }}>Hola</Text>
              <Text style={{ fontSize: 16, fontFamily: 'NunitoSemiBold', fontWeight: 600 }}>{data?.user.name}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/(profile)/notifications')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              height: 30,
              width: 30,
            }}
          >
            <Bell />
            <View
              style={{
                position: 'absolute',
                top: -1,
                right: -1,
                backgroundColor: '#8167ec',
                borderRadius: 1000,
                width: 8,
                height: 8,
              }}
            ></View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            width: '100%',
            paddingHorizontal: 16,
            paddingVertical: 8,
            gap: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <LottieView
            style={{
              width: 60,
              height: 60,
            }}
            source={require('@/assets/animations/bot_greeting.json')}
            autoPlay
            loop={true}
            ref={animation}
          />
          <View style={{ flex: 1 }}>
            <Image source={logoHelsa} style={{ width: 70, height: 30 }} resizeMode="contain" />
            <Text style={{ fontFamily: 'Nunito', fontWeight: 500, color: '#000' }}>Ir al chat</Text>
          </View>
          <ChevronRight color={'#8167ec'} />
        </TouchableOpacity>
        <View
          style={{
            width: '100%',

            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 20,
            gap: 16,
          }}
        >
          <Text>¿Como te sientes hoy?</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setMood('angry')}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: (mood === 'angry' && '#ea3a3d') || '#d4d4d4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Angry size={36} color={'#fff'} />
              </View>
              <Text style={{ fontSize: 10 }}>Molesto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => setMood('sad')}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: (mood === 'sad' && '#4b3eff') || '#d4d4d4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Frown size={36} color={'#fff'} />
              </View>
              <Text style={{ fontSize: 10 }}>Triste</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setMood('neutral')}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: (mood === 'neutral' && '#000') || '#d4d4d4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Meh size={36} color={'#fff'} />
              </View>
              <Text style={{ fontSize: 10 }}>Neutral</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setMood('happy')}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: (mood === 'happy' && '#f1b603') || '#d4d4d4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Smile size={36} color={'#fff'} />
              </View>
              <Text style={{ fontSize: 10 }}>Feliz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setMood('euphoric')}
            >
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 15,
                  overflow: 'hidden',
                  backgroundColor: (mood === 'euphoric' && '#8167ec') || '#d4d4d4',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Laugh size={36} color={'#fff'} />
              </View>
              <Text style={{ fontSize: 10 }}>Eufórico</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 16,
          }}
        >
          <View
            style={{
              backgroundColor: '#8167ec',
              borderRadius: 20,
              padding: 16,
              flex: 1,
              gap: 16,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 1000,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 4,
                }}
              >
                <BookMarked color={'#8167ec'} />
              </View>
            </View>
            <Text style={{ color: '#fff', fontSize: 16 }}>Actividades diarias</Text>
          </View>
          <View
            style={{
              backgroundColor: '#8167ec',
              borderRadius: 20,
              padding: 16,
              flex: 1,
              gap: 16,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 1000,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 4,
                }}
              >
                <Brain color={'#8167ec'} />
              </View>
            </View>
            <Text style={{ color: '#fff', fontSize: 16 }}>Pensamientos</Text>
          </View>
        </View>
        <View style={{ width: '100%', gap: 8, marginBottom: 100 }}>
          <Text style={{ fontSize: 16, fontFamily: 'NunitoSemiBold', fontWeight: 600, marginBottom: 8 }}>
            Próximas citas
          </Text>
          {mockAppointments.map((appointment) => (
            <View
              key={appointment.id}
              style={{ borderRadius: 20, backgroundColor: '#fff', padding: 16, marginVertical: 8 }}
            >
              <Text style={{ fontSize: 16, fontFamily: 'NunitoSemiBold', fontWeight: 600 }}>{appointment.title}</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                {appointment.date} - {appointment.time}
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)')}
                style={{
                  marginTop: 8,
                  backgroundColor: '#8167ec',
                  padding: 8,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 14 }}>Ver detalles</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* <TouchableOpacity
          onPress={async () => {
            await authClient.signOut();
            router.push('/(auth)/sign-in');
          }}
        >
          <Text>Salir</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
}
