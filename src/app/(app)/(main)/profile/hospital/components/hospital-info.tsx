import { Hospital } from '@/modules/hospital/domain/hospital';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { AddressSection } from './sections/address-section';
import { NameSection } from './sections/name-section';

const HospitalInfo = ({ hospital }: { hospital: Primitives<Hospital> }) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <NameSection name={hospital.name} id={hospital.id} />
      <AddressSection address={hospital.address} id={hospital.id} />
    </div>
  );
};

export default HospitalInfo;
