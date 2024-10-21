import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import SideBar from '../../components/shared/side-bar/side-bar';
import TopBar from '../../components/shared/top-bar/top-bar';

const Layout = ({ children }) => {
  const { userId, sessionClaims } = auth();
  if (!userId) return redirect('/sign-in');
  return (
    <div className="flex justify-start items-start w-full">
      <SideBar role={sessionClaims.metadata.role}></SideBar>
      <div className="flex flex-col items-start w-full">
        <TopBar role={sessionClaims.metadata.role || ''}></TopBar>
        {children}
      </div>
    </div>
  );
};

export default Layout;
