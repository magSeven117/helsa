'use client';

import { getPatient } from '@helsa/engine/patient/infrastructure/http-patient-api';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSession } from '../../auth/session-provider';
import { BloodTypeSection } from './blood-type-section';
import { CivilStatusSection } from './civil-status-section';
import { EducationLevelSection } from './education-level-section';
import { HeightSection } from './height-section';
import { OccupationSection } from './occupation-section';
import { OrganDonorSection } from './organ-donor-section';

const PatientProfileIndex = () => {
  const { profile } = useSession();
  const { data: patient, isFetching } = useQuery({
    queryKey: ['patient', profile.id],
    queryFn: async () => getPatient(profile.id),
    enabled: !!profile?.id,
    refetchOnWindowFocus: false,
  });
  if (isFetching || !patient) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <CivilStatusSection civilStatus={patient.demographic.civilStatus as any} id={patient.id} />
      <OccupationSection occupation={patient.demographic.occupation} id={patient.id} />
      <EducationLevelSection educativeLevel={patient.demographic.educativeLevel as any} id={patient.id} />
      <HeightSection height={patient.biometric.height.toString()} id={patient.id} />
      <BloodTypeSection bloodType={patient.biometric.bloodType} id={patient.id} />
      <OrganDonorSection organDonor={patient.biometric.organDonor} id={patient.id} />
    </>
  );
};

export default PatientProfileIndex;
