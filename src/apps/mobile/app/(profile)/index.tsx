import { authClient } from '@helsa/auth/mobile';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, HeartPlusIcon, Pencil, Settings, Shield, User } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const { data } = authClient.useSession();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#8167ec', height: Dimensions.get('screen').height }}>
      <SafeAreaView
        style={{ backgroundColor: '#8167ec', height: Dimensions.get('screen').height, position: 'relative' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
            onPress={() => {
              router.back();
            }}
          >
            <ChevronLeft color={'#fff'} />
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: 1000,
              width: 40,
              height: 40,
            }}
          >
            <Pencil color={'#8167ec'} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
          {data ? (
            <View
              style={{
                width: 95,
                height: 95,
                borderRadius: 1000,
                overflow: 'hidden',
                padding: 5,
                borderColor: '#fff',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image src={data.user.image ?? ''} style={{ width: 90, height: 90 }} resizeMode="contain" />
            </View>
          ) : (
            <View
              style={{
                width: 95,
                height: 95,
                borderRadius: 1000,
                overflow: 'hidden',
                marginBottom: 20,
                padding: 5,
                borderColor: '#fff',
                backgroundColor: '#fff',
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></View>
          )}
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Nunito' }}>
            {data ? `${data.user.name}` : 'Usuario no autenticado'}
          </Text>
        </View>
        <View
          style={{
            height: '100%',
            backgroundColor: '#fff',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingTop: 80,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ gap: 20, backgroundColor: '#e5e5e5', padding: 8, borderRadius: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',

                padding: 8,
                borderRadius: 10,
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <User />
                <Text style={{ fontSize: 18 }}>Información personal</Text>
              </View>
              <ChevronRight />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',

                padding: 8,
                borderRadius: 10,
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <HeartPlusIcon />
                <Text style={{ fontSize: 18 }}>Información medica</Text>
              </View>
              <ChevronRight />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',

                padding: 8,
                borderRadius: 10,
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Settings />
                <Text style={{ fontSize: 18 }}>Configuración</Text>
              </View>
              <ChevronRight />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',

                padding: 8,
                borderRadius: 10,
                width: '100%',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Shield />
                <Text style={{ fontSize: 18 }}>Seguridad</Text>
              </View>
              <ChevronRight />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#EC3A55',
              padding: 15,
              borderRadius: 10,
              marginTop: 20,
              alignItems: 'center',
            }}
            onPress={async () => {
              await authClient.signOut();
              router.push('/(auth)/sign-in');
            }}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Index;
