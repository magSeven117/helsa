import { getPatient } from '@/modules/patient/presentation/actions/get-patient';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { BloodTypeSection } from '../../../../components/profile/patient-sections/blood-type-section';
import { CivilStatusSection } from '../../../../components/profile/patient-sections/civil-status-section';
import { EducationLevelSection } from '../../../../components/profile/patient-sections/education-level-section';
import { HeightSection } from '../../../../components/profile/patient-sections/height-section';
import { OccupationSection } from '../../../../components/profile/patient-sections/occupation-section';
import { OrganDonorSection } from '../../../../components/profile/patient-sections/organ-donor-section';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const patient = await getPatient({ id: user.id });
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
