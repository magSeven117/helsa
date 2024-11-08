import { Hospital } from "@/modules/hospital/domain/hospital";
import { Primitives } from "@/modules/shared/domain/types/primitives";


const HospitalInfo = ({ hospital }: { hospital: Partial<Primitives<Hospital>> }) => {
  return (
    <div className="flex flex-col w-full gap-10">
    </div>
  );
}

export default HospitalInfo;