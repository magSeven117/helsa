import { Patient } from "@/modules/patient/domain/patient";
import { Primitives } from "@/modules/shared/domain/types/primitives";
import { BloodTypeSection } from "./sections/blood-type-section";
import { CivilStatusSection } from "./sections/civil-status-section";
import { EducationLevelSection } from "./sections/education-level-section";
import { HeightSection } from "./sections/height-section";
import { OccupationSection } from "./sections/occupation-section";

const PatientInfo = ({ patient }: { patient: Partial<Primitives<Patient>> }) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <CivilStatusSection civilStatus={patient.demographic.civilStatus as any} id={patient.id}/>
      <OccupationSection occupation={patient.demographic.occupation} id={patient.id} />
      <EducationLevelSection educationLevel={patient.demographic.educativeLevel as any} id={patient.id}/>
      <HeightSection height={patient.biometric.height.toString()} id={patient.id} />
      <BloodTypeSection bloodType={patient.biometric.bloodType} id={patient.id} />
    </div>
  );
}

export default PatientInfo;