import ChangePasswordForm from "@/app/(app)/components/profile/password/change-password-form";
import { Separator } from "@/libs/shadcn-ui/components/separator";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Control de seguridad</h3>
        <p className="text-sm text-muted-foreground">
          Administra tus contraseñas y configuraciones de seguridad.
        </p>
      </div>
      <Separator />
      <ChangePasswordForm />
    </div>
  );
}

export default Page;
