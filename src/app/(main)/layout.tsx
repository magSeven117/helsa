import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import SideBar from './_module/components/side-bar/side-bar';
import TopBar from './_module/components/top-bar';

const Layout = ({ children }) => {
  const { userId, sessionClaims } = auth();
  if (!userId) return redirect('/sign-in');
  return (
    <div className="flex justify-start items-start w-full">
      <SideBar role={sessionClaims.metadata.role}></SideBar>
      <div className="flex flex-col items-start w-full">
        <TopBar></TopBar>
        {children}
      </div>
    </div>
  );
};

export default Layout;
