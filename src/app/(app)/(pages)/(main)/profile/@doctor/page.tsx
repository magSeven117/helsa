import { PersonalInfo } from "@/app/(app)/components/profile/new/personal-info/personal-info";
import { Separator } from "@/libs/shadcn-ui/components/separator";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  if(!user) return null;
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Datos personales</h3>
        <p className="text-sm text-muted-foreground">
          Revisa y actualiza tus datos personales.
        </p>
      </div>
      <Separator />
      <PersonalInfo user={{
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        bio: user.publicMetadata.bio,
        imageUrl: user.imageUrl,
      }} />
    </div>
  );
}

export default Page;
