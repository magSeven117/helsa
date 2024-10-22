import DoctorProfile from "@/app/(app)/components/profile/doctor-profile";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  return (
    <DoctorProfile user={user}/>
  );
}

export default Page;
