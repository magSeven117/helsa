import { Criteria } from "@/modules/shared/domain/core/Criteria";
import { Doctor } from "./Doctor";

export interface DoctorRepository {
  save(doctor: Doctor): Promise<void>;
  findByCriteria(criteria: Criteria): Promise<Doctor[]>;
  getByCriteria(criteria: Criteria): Promise<Doctor>;
}
