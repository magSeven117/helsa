import { getDoctor } from '@/src/actions/doctor/get-doctor';
import { getSpecialties } from '@/src/actions/doctor/get-specialties';
import { AddressSection } from '@/src/components/profile/doctor-sections/address-section';
import { EducationsSection } from '@/src/components/profile/doctor-sections/educations-section';
import { ExperienceSection } from '@/src/components/profile/doctor-sections/experience-section';
import { LicenseNumberSection } from '@/src/components/profile/doctor-sections/license-number';
import { SpecialtySection } from '@/src/components/profile/doctor-sections/specialty-section';

const Page = async () => {
  const [doctorResponse, specialtiesResponse] = await Promise.all([getDoctor(), getSpecialties()]);
  const doctor = doctorResponse?.data ?? null;
  const data = specialtiesResponse?.data ?? null;
  if (!doctor) {
    return null;
  }
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col w-full gap-10">
        <LicenseNumberSection licenseMedicalNumber={doctor.licenseMedicalNumber} id={doctor.id} />
        <SpecialtySection specialtyId={doctor.specialtyId} id={doctor.id} specialties={data ?? []} />
        <AddressSection consultingRoom={doctor.consultingRoomAddress || { city: '', address: '' }} id={doctor.id} />
        <ExperienceSection experience={doctor.experience.toString()} id={doctor.id} />
        <EducationsSection educations={doctor.educations || []} id={doctor.id} />
      </div>
    </div>
  );
};

export default Page;
