import ProfessionalInfo from "@/app/(app)/components/profile/professional-info/professional-info";
import { getDoctor } from "@/modules/doctor/presentation/actions/get-doctor";
import { getCurrentUser } from "@/modules/user/presentation/actions/get-current-user";

const Page = async () => {
  const user = await getCurrentUser()
  const doctor = await getDoctor(user.id)
  return (
    <div className="space-y-6 w-full">
      <ProfessionalInfo doctor={{
        id: doctor.id,
        licenseMedicalNumber: doctor.licenseMedicalNumber,
        consultingRoomAddress: doctor.consultingRoomAddress,
        experience: doctor.experience,
        specialtyId: doctor.specialtyId,
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
