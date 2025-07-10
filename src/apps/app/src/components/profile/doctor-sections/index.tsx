'use client';
import { useSession } from '@/src/components/auth/session-provider';
import { getDoctor } from '@helsa/engine/doctor/infrastructure/http/http-doctor-api';
import { useQuery } from '@tanstack/react-query';
import { AddressSection } from './address-section';
import { EducationsSection } from './educations-section';
import { ExperienceSection } from './experience-section';
import { LicenseNumberSection } from './license-number';
import { SpecialtySection } from './specialty-section';

const DoctorProfileIndex = () => {
  const { profile } = useSession();
  const { data: doctor } = useQuery({
    queryKey: ['doctor'],
    queryFn: async () => getDoctor(profile?.id || ''),
    refetchOnWindowFocus: false,
  });
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
      <ExperienceSection experience={doctor.experience} id={doctor.id} />
      <EducationsSection educations={doctor.educations || []} id={doctor.id} />
    </>
  );
};

export default DoctorProfileIndex;
