import { useSession } from '@helsa/auth/mobile';
import { Redirect } from 'expo-router';

const Index = () => {
  const data = useSession();
  console.log(data.data);
  if (data.data) {
    return <Redirect href={'/(root)/(tabs)/home'} />;
  }
  return <Redirect href={'/(auth)/welcome'}></Redirect>;
};

export default Index;
