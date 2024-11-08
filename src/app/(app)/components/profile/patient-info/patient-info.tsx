import { Patient } from "@/modules/patient/domain/patient";
import { Primitives } from "@/modules/shared/domain/types/primitives";
import { CivilStatusSection } from "./sections/civil-status-section";

const PatientInfo = ({ patient }: { patient: Partial<Primitives<Patient>> }) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <CivilStatusSection civilStatus={patient.demographic.civilStatus as any} id={patient.id}/>
    </div>
  );
}

export default PatientInfo;