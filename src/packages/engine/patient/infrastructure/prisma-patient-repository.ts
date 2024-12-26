import { Criteria } from '@helsa/ddd/core/criteria';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { PrismaCriteriaConverter } from '@helsa/database/converter';
import { PrismaClient } from '@helsa/database';
import { Allergy } from '../domain/members/allergy';
import { ChronicDisease } from '../domain/members/chronic-disease';
import { PatientContact } from '../domain/members/contact';
import { Surgery } from '../domain/members/surgery';
import { Vaccine } from '../domain/members/vaccine';
import { Patient } from '../domain/patient';
import { PatientRepository } from '../domain/patient-repository';

export class PrismaPatientRepository implements PatientRepository {
  private converter = new PrismaCriteriaConverter();
  constructor(private client: PrismaClient) {}

  get model() {
    return this.client.patient;
  }

  async save(patient: Patient): Promise<void> {
    const data = patient.toPrimitives();
    await this.model.upsert({
      where: { id: data.id },
      update: {
        userId: data.userId,
        demographic: data.demographic,
        biometric: data.biometric,
      },
      create: {
        id: data.id,
        userId: data.userId,
        demographic: data.demographic,
        biometric: data.biometric,
      },
    });
    await this.saveMembers(
      patient.id,
      patient.allergies,
      patient.diseases,
      patient.contacts,
      patient.vaccines,
      patient.surgeries
    );
  }

  async saveMembers(
    patientId: Uuid,
    allergies: Allergy[],
    diseases: ChronicDisease[],
    contacts: PatientContact[],
    vaccines: Vaccine[],
    surgeries: Surgery[]
  ): Promise<void> {
    const allergiesPromise = allergies.map((allergy) =>
      this.client.allergy.upsert({
        where: { id: allergy.id.value },
        create: { ...allergy.toPrimitives(), patientId: patientId.value },
        update: { ...allergy.toPrimitives(), patientId: patientId.value },
      })
    );
    const diseasesPromise = diseases.map((disease) =>
      this.client.chronicDisease.upsert({
        where: { id: disease.id.value },
        create: { ...disease.toPrimitives(), patientId: patientId.value },
        update: { ...disease.toPrimitives(), patientId: patientId.value },
      })
    );
    const contactsPromise = contacts.map((contact) =>
      this.client.patientContact.upsert({
        where: { id: contact.id.value },
        create: { ...contact.toPrimitives(), patientId: patientId.value },
        update: { ...contact.toPrimitives(), patientId: patientId.value },
      })
    );
    const vaccinesPromise = vaccines.map((vaccine) =>
      this.client.vaccine.upsert({
        where: { id: vaccine.id.value },
        create: { ...vaccine.toPrimitives(), patientId: patientId.value },
        update: { ...vaccine.toPrimitives(), patientId: patientId.value },
      })
    );
    const surgeriesPromise = surgeries.map((surgery) =>
      this.client.surgery.upsert({
        where: { id: surgery.id.value },
        create: { ...surgery.toPrimitives(), patientId: patientId.value },
        update: { ...surgery.toPrimitives(), patientId: patientId.value },
      })
    );
    await Promise.all([
      Promise.all(allergiesPromise),
      Promise.all(diseasesPromise),
      Promise.all(contactsPromise),
      Promise.all(vaccinesPromise),
      Promise.all(surgeriesPromise),
    ]);

    await this.model.update({
      where: { id: patientId.value },
      data: {
        allergies: {
          connect: allergies.map((allergy) => ({ id: allergy.id.value })),
        },
        diseases: {
          connect: diseases.map((disease) => ({ id: disease.id.value })),
        },
        contacts: {
          connect: contacts.map((contact) => ({ id: contact.id.value })),
        },
        vaccines: {
          connect: vaccines.map((vaccine) => ({ id: vaccine.id.value })),
        },
        surgeries: {
          connect: surgeries.map((surgery) => ({ id: surgery.id.value })),
        },
      },
    });
  }

  async find(criteria: Criteria): Promise<Patient | null> {
    const { where } = this.converter.criteria(criteria);
    const patient = await this.model.findFirst({
      where,
      include: {
        allergies: true,
        diseases: true,
        contacts: true,
        vaccines: true,
        surgeries: true,
      },
    });
    if (!patient) return null;
    return Patient.fromPrimitives(patient as unknown as Primitives<Patient>);
  }
  async search(criteria: Criteria): Promise<Patient[]> {
    const { orderBy, skip, take, where } = this.converter.criteria(criteria);
    const patients = await this.model.findMany({
      where,
      include: {
        allergies: true,
        diseases: true,
        contacts: true,
        vaccines: true,
        surgeries: true,
      },
      orderBy,
      skip,
      take,
    });
    return patients.map((patient) => Patient.fromPrimitives(patient as unknown as Primitives<Patient>));
  }
}
