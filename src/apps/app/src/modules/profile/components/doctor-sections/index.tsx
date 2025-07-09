'use client';
import { useSession } from '../../../../app/(app)/(main)/_components/session-provider';
import { useDoctor } from '../../hooks/use-doctor';
import { AddressSection } from './address-section';
import { EducationsSection } from './educations-section';
import { ExperienceSection } from './experience-section';
import { LicenseNumberSection } from './license-number';
import { SpecialtySection } from './specialty-section';

const DoctorProfileIndex = () => {
  const { profile } = useSession();
  const { doctor } = useDoctor(profile?.id || '');
  if (!doctor) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Doctor not found</h1>
        <p className="text-gray-500">Please check your profile or contact support.</p>
      </div>
    );
  }

  return (
    <>
      <LicenseNumberSection licenseMedicalNumber={doctor.licenseMedicalNumber} id={doctor.id} />
      <SpecialtySection specialtyId={doctor.specialtyId} id={doctor.id} />
      <AddressSection consultingRoom={doctor.consultingRoomAddress || { city: '', address: '' }} id={doctor.id} />
      <ExperienceSection experience={doctor.experience.toString()} id={doctor.id} />
      <EducationsSection educations={doctor.educations || []} id={doctor.id} />
    </>
  );
};

export default DoctorProfileIndex;
