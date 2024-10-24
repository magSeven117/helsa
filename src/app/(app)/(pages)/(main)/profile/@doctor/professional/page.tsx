import { Separator } from "@/libs/shadcn-ui/components/separator";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Datos sobre tu carrera profesional</h3>
        <p className="text-sm text-muted-foreground">
          Completa los datos sobre tu carrera profesional para que los pacientes puedan conocerte mejor.
        </p>
      </div>
      <Separator />
    </div>
  );
}

export default Page;
