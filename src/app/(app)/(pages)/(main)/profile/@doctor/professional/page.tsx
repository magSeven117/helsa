import ProfessionalInfo from "@/app/(app)/components/profile/professional-info/professional-info";
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
        experience: 5,
        educations: [
          {
            id: "1",
            title: "Doctor en Medicina",
            institution: "Universidad Nacional de Colombia",
            graduateAt: new Date('2015-01-01')
          },
          {
            id: "2",
            title: "Especialista en Medicina Interna",
            institution: "Universidad Nacional de Colombia",
            graduateAt: new Date('2019-06-01')
          }
        ]
      }} />
    </div>
  );
}

export default Page;
