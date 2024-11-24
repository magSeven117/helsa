import { redirect } from 'next/navigation';

const Page = async () => {
  return redirect('/dashboard');
};

export default Page;
