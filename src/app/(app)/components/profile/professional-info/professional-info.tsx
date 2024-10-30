import { Doctor } from "@/modules/doctor/domain/doctor";
import { Primitives } from "@/modules/shared/domain/types/primitives";
import { AddressInfoForm } from "./forms/address-info";
import { EducationForm } from "./forms/education-form";
import { ExperienceForm } from "./forms/experience-form";
import { LicenseNumberForm } from "./forms/license-number-form";
import { SpecialtyForm } from "./forms/specialty-form";

const ProfessionalInfo = ({ doctor }: { doctor: Partial<Primitives<Doctor>> }) => {
  return (
    <div>
      <LicenseNumberForm licenseMedicalNumber={doctor.licenseMedicalNumber}/>
      <SpecialtyForm specialtyId="3" />
      <AddressInfoForm  city={doctor.consultingRoomAddress.city} address={doctor.consultingRoomAddress.address}  />
      <ExperienceForm experience={doctor.experience} />
      <EducationForm educations={doctor.educations} />
    </div>
  );
}

export default ProfessionalInfo;
