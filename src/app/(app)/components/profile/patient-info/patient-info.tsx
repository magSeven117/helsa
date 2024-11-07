import { Patient } from "@/modules/patient/domain/patient";
import { Primitives } from "@/modules/shared/domain/types/primitives";

const PatientInfo = ({ patient }: { patient: Partial<Primitives<Patient>> }) => {
  return (
    <div className="flex flex-col w-full gap-10">
    </div>
  );
}

export default PatientInfo;