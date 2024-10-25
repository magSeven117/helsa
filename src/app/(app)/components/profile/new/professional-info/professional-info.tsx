import { Doctor } from "@/modules/doctor/domain/Doctor";
import { Primitives } from "@/modules/shared/domain/types/Primitives";
import { AddressInfoForm } from "./forms/address-info";
import { LicenseNumberForm } from "./forms/license-number-form";
import { SpecialtyForm } from "./forms/specialty-form";

const ProfessionalInfo = ({ doctor }: { doctor: Partial<Primitives<Doctor>> }) => {
  return (
    <div>
      <LicenseNumberForm licenseMedicalNumber={doctor.licenseMedicalNumber}/>
      <SpecialtyForm specialtyId="3" />
      <AddressInfoForm  city={doctor.consultingRoomAddress.city} address={doctor.consultingRoomAddress.address}  />
    </div>
  );
}

export default ProfessionalInfo;
