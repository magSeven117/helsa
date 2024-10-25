import ProfessionalInfo from "@/app/(app)/components/profile/new/professional-info/professional-info";
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
      <ProfessionalInfo doctor={{
        licenseMedicalNumber: "123456789",
        consultingRoomAddress: {
          city: "Bogotá",
          address: "Cra 123 # 123 - 123",
          id: "1",
          roomCoordinates: {
            latitude: 4.123456,
            longitude: -74.123456
          }
        },
        experience: 5
      }} />
    </div>
  );
}

export default Page;
