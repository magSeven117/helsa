import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Layout = ({ children }) => {
  const { userId } = auth();
  if(!userId) return redirect('/sign-in')
  return (
    <div>
      {children}
    </div>
  );
}

export default Layout;
