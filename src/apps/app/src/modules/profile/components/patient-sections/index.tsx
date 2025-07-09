'use client';

import { Loader2 } from 'lucide-react';
import { useSession } from '../../../../app/(app)/(main)/_components/session-provider';
import { usePatient } from '../../hooks/use-patient';
import { BloodTypeSection } from './blood-type-section';
import { CivilStatusSection } from './civil-status-section';
import { EducationLevelSection } from './education-level-section';
import { HeightSection } from './height-section';
import { OccupationSection } from './occupation-section';
import { OrganDonorSection } from './organ-donor-section';

const PatientProfileIndex = () => {
  const { profile } = useSession();
  const { patient, isFetching } = usePatient(profile?.id ?? '');
  if (isFetching) {
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
