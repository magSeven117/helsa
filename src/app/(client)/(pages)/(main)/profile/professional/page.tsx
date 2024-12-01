import { getSpecialties } from '@/app/(server)/actions/doctor/get-specialties';
import { getDoctor } from '@/modules/doctor/presentation/actions/get-doctor';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import { AddressSection } from '../../../../components/profile/doctor-sections/address-section';
import { EducationsSection } from '../../../../components/profile/doctor-sections/educations-section';
import { ExperienceSection } from '../../../../components/profile/doctor-sections/experience-section';
import { LicenseNumberSection } from '../../../../components/profile/doctor-sections/license-number';
import { SpecialtySection } from '../../../../components/profile/doctor-sections/specialty-section';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const doctor = await getDoctor(user.id);
  const data = await getSpecialties();
  if (!doctor) {
    return null;
  }
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <LicenseNumberSection licenseMedicalNumber={doctor.licenseMedicalNumber} id={doctor.id} />
        <SpecialtySection specialtyId={doctor.specialtyId} id={doctor.id} specialties={data?.data ?? []} />
        <AddressSection consultingRoom={doctor.consultingRoomAddress || { city: '', address: '' }} id={doctor.id} />
        <ExperienceSection experience={doctor.experience.toString()} id={doctor.id} />
        <EducationsSection educations={doctor.educations || []} id={doctor.id} />
      </div>
    </div>
  );
};

export default Page;
