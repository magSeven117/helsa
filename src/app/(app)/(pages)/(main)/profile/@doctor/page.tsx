import { ProfileForm } from "@/app/(app)/components/profile/new/forms/profile-form";
import { Separator } from "@/libs/shadcn-ui/components/separator";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}

export default Page;
