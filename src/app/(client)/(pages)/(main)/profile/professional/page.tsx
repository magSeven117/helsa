import { AddressSection } from '@/app/(client)/components/profile/doctor-sections/address-section';
import { EducationsSection } from '@/app/(client)/components/profile/doctor-sections/educations-section';
import { ExperienceSection } from '@/app/(client)/components/profile/doctor-sections/experience-section';
import { LicenseNumberSection } from '@/app/(client)/components/profile/doctor-sections/license-number';
import { SpecialtySection } from '@/app/(client)/components/profile/doctor-sections/specialty-section';
import { getDoctor } from '@/app/(server)/actions/doctor/get-doctor';
import { getSpecialties } from '@/app/(server)/actions/doctor/get-specialties';
import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';

const Page = async () => {
  const res = await getCurrentUser();
  const user = res?.data ?? null;
  if (!user) {
    return null;
  }
  const doctorResponse = await getDoctor({ userId: user.id });
  const doctor = doctorResponse?.data ?? null;
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
