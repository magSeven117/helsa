import logo from '@/assets/images/icon-brand.png';
import Loader from '@/components/shared/loader';
import Input from '@/components/ui/input';
import { useAuthState } from '@/hooks/use-auth';
import { authClient } from '@helsa/auth/mobile';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const schema = z.object({
  code: z.string().min(1, 'El código OTP es requerido').regex(/^\d+$/, 'El código debe ser numérico'),
});

type FormData = z.infer<typeof schema>;

export default function VerifyEmailScreen() {
  const { currentEmail } = useAuthState();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, control, formState } = form;

  const submit = async (data: FormData) => {
    await authClient.emailOtp.verifyEmail({
      email: currentEmail!,
      otp: data.code,
    });
    router.push('/(auth)/registered');
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#8167ec',
        height: Dimensions.get('screen').height,
      }}
    >
      <SafeAreaView
        style={{ backgroundColor: '#8167ec', height: Dimensions.get('screen').height, position: 'relative' }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 20,
            flexDirection: 'row',
          }}
          onPress={() => {
            router.push('/(auth)/sign-up');
          }}
        >
          <ChevronLeft color={'#fff'} />
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Volver</Text>
        </TouchableOpacity>
        <View style={{ height: 100, width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <Image source={logo} style={{ height: 70 }} resizeMode="contain" />
        </View>
        <View style={{ height: '100%', backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 24, height: '100%' }}>
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'semibold',
                  fontFamily: 'NunitoSemiBold',
                  marginBottom: 8,
                  textAlign: 'center',
                }}
              >
                Verifica tu correo electrónico
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#0E0E0E',
                  marginBottom: 20,
                  fontFamily: 'NunitoSemiBold',
                  textAlign: 'center',
                }}
              >
                Hemos enviado un código de verificación a tu correo electrónico. Por favor, ingrésalo a continuación.
              </Text>
            </View>
            <View style={{ width: '100%', gap: 5, marginBottom: 5 }}>
              <Text style={{ fontSize: 14, fontFamily: 'NunitoSemibold', paddingLeft: 4 }}>Código</Text>
              <Controller
                name="code"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input onChangeText={onChange} value={value} onBlur={onBlur} />
                )}
              />
            </View>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#8167ec',
                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                borderWidth: 2,
                borderColor: '#FFF',
              }}
              onPress={handleSubmit(() => console.log('Hola'), console.log)}
            >
              {formState.isSubmitting ? (
                <Loader />
              ) : (
                <Text style={{ color: '#fff', fontFamily: 'NunitoBold' }}>Verificar</Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                gap: 3,
              }}
            >
              <Text
                style={{
                  fontFamily: 'NunitoMedium',
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#EOEOEO',
                  marginTop: 20,
                }}
                onPress={() => {}}
              >
                ¿No recibiste el código?
              </Text>
              <Text
                style={{ fontFamily: 'NunitoBold', color: '#8167ec', fontSize: 16, textAlign: 'center', marginTop: 20 }}
              >
                {' '}
                Reenviar código
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
