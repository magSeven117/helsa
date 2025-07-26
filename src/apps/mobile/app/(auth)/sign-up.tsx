import logo from '@/assets/images/icon-brand.png';
import { AppleOauth, FacebookOauth, GoogleOauth } from '@/components/auth/oauth';
import Loader from '@/components/shared/loader';
import Input from '@/components/ui/input';
import { useAuthState } from '@/hooks/use-auth';
import { authClient } from '@helsa/auth/mobile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: 'First name is too short' }),
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password is too short' }),
});

const SignUp = () => {
  const { setCurrentEmail } = useAuthState();
  const { control, handleSubmit, formState } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const submit = async (data: z.infer<typeof formSchema>) => {
    try {
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'PATIENT',
      });
      setCurrentEmail(data.email);
      router.push('/(auth)/verify-email');
    } catch (error) {
      console.log(error);
    }
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
            router.push('/(auth)/welcome');
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
                Crea tu cuenta
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
                Estamos aquí para ayudarte a alcanzar tus metas de bienestar.
              </Text>
            </View>
            <View style={{ width: '100%', gap: 5, marginBottom: 5 }}>
              <Text style={{ fontSize: 14, fontFamily: 'NunitoSemibold', paddingLeft: 4 }}>Nombre</Text>
              <Controller
                name="name"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input onChangeText={onChange} value={value} onBlur={onBlur} />
                )}
              />
            </View>
            <View style={{ width: '100%', gap: 5, marginBottom: 5 }}>
              <Text style={{ fontSize: 14, fontFamily: 'NunitoSemibold', paddingLeft: 4 }}>Correo electrónico</Text>
              <Controller
                name="email"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input onChangeText={onChange} value={value} onBlur={onBlur} />
                )}
              />
            </View>
            <View style={{ width: '100%', gap: 5, marginBottom: 5 }}>
              <Text style={{ fontSize: 14, fontFamily: 'NunitoSemibold', paddingLeft: 4 }}>Contraseña</Text>
              <Controller
                name="password"
                rules={{ required: true }}
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input onChangeText={onChange} value={value} onBlur={onBlur} secureTextEntry />
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
              onPress={handleSubmit(submit, console.log)}
            >
              {formState.isSubmitting ? (
                <Loader />
              ) : (
                <Text style={{ color: '#fff', fontFamily: 'NunitoBold' }}>Registrarse</Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                marginVertical: 5,
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                gap: 20,
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: '#000' }} />
              <Text style={{ fontSize: 18 }}>O</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: '#000' }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
              <FacebookOauth />
              <GoogleOauth />
              <AppleOauth />
            </View>
            <Link
              href={'/(auth)/verify-email'}
              style={{ fontSize: 16, fontFamily: 'NunitoMedium', textAlign: 'center', color: '#EOEOEO', marginTop: 20 }}
            >
              <Text style={{ fontFamily: 'NunitoMedium', color: '#0E0E0E' }}>¿Ya tienes una cuenta?</Text>
              <Text style={{ fontFamily: 'NunitoBold', color: '#8167ec' }}> Inicia sesion</Text>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
