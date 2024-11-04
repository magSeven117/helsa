import { Doctor } from "@/modules/doctor/domain/doctor";
import { Primitives } from "@/modules/shared/domain/types/primitives";
import { EducationSection } from "./sections/education-section";
import { AddressSection } from "./sections/address-section";
import { ExperienceSection } from "./sections/experience-section";
import { LicenseNumberSection } from "./sections/license-number";
import { SpecialtySection } from "./sections/specialty-section";

const ProfessionalInfo = ({ doctor }: { doctor: Partial<Primitives<Doctor>> }) => {
  return (
    <div className="flex flex-col w-full gap-10">
      <LicenseNumberSection licenseMedicalNumber={doctor.licenseMedicalNumber} id={doctor.id} />
      <SpecialtySection specialtyId={doctor.specialtyId} id={doctor.id} />
      <AddressSection consultingRoom={doctor.consultingRoomAddress || { city: '', address: '' }} id={doctor.id}/>
      <ExperienceSection experience={doctor.experience.toString()} id={doctor.id} />
      <EducationSection educations={doctor.educations} />
    </div>
  );
}

export default ProfessionalInfo;
