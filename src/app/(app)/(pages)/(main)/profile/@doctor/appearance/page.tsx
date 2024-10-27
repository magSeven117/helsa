import { AppearanceForm } from "@/app/(app)/components/profile/appearance/appearance-form";
import { Separator } from "@/libs/shadcn-ui/components/separator";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Apariencia</h3>
        <p className="text-sm text-muted-foreground">
          Personaliza la apariencia de la aplicación. Cambia automáticamente entre temas de día y de noche.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}

export default Page;
