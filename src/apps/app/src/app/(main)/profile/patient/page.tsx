import { getPatient } from '@/src/actions/patient/get-patient';
import { getCurrentUser } from '@/src/actions/user/get-current-user';
import { BloodTypeSection } from '@/src/components/profile/patient-sections/blood-type-section';
import { CivilStatusSection } from '@/src/components/profile/patient-sections/civil-status-section';
import { EducationLevelSection } from '@/src/components/profile/patient-sections/education-level-section';
import { HeightSection } from '@/src/components/profile/patient-sections/height-section';
import { OccupationSection } from '@/src/components/profile/patient-sections/occupation-section';
import { OrganDonorSection } from '@/src/components/profile/patient-sections/organ-donor-section';

const Page = async () => {
  const userResponse = await getCurrentUser();
  const user = userResponse?.data ?? null;
  if (!user) {
    return null;
  }
  const patientResponse = await getPatient({ userId: user.id });
  const patient = patientResponse?.data ?? null;
  if (!patient) {
    return null;
  }
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <CivilStatusSection civilStatus={patient.demographic.civilStatus as any} id={patient.id} />
        <OccupationSection occupation={patient.demographic.occupation} id={patient.id} />
        <EducationLevelSection educativeLevel={patient.demographic.educativeLevel as any} id={patient.id} />
        <HeightSection height={patient.biometric.height.toString()} id={patient.id} />
        <BloodTypeSection bloodType={patient.biometric.bloodType} id={patient.id} />
        <OrganDonorSection organDonor={patient.biometric.organDonor} id={patient.id} />
      </div>
    </div>
  );
};

export default Page;
