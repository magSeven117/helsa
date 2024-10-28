import { Aggregate } from '@/modules/shared/domain/core/aggregate';
import { DateValueObject } from '@/modules/shared/domain/core/value-object';
import { Uuid } from '@/modules/shared/domain/core/value-objects/uuid';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { Allergy } from './members/allergy';
import { BloodTypes, OrganDonors, PatientBiometric } from './members/biometric';
import { ChronicDisease } from './members/chronic-disease';
import { PatientContact } from './members/contact';
import { PatientDemographic } from './members/demographic';
import { Surgery } from './members/surgery';
import { Vaccine } from './members/vaccine';

export class Patient extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public demographic: PatientDemographic,
    public biometric: PatientBiometric,
    public allergies: Allergy[],
    public diseases: ChronicDisease[],
    public contacts: PatientContact[],
    public vaccines: Vaccine[],
    public surgeries: Surgery[],
    createdAt: DateValueObject,
    updatedAt: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Patient> {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      demographic: this.demographic.toPrimitives(),
      biometric: this.biometric.toPrimitives(),
      allergies: this.allergies.map((allergy) => allergy.toPrimitives()),
      diseases: this.diseases.map((disease) => disease.toPrimitives()),
      contacts: this.contacts.map((contact) => contact.toPrimitives()),
      vaccines: this.vaccines.map((vaccine) => vaccine.toPrimitives()),
      surgeries: this.surgeries.map((surgery) => surgery.toPrimitives()),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(data: Primitives<Patient>): Patient {
    return new Patient(
      new Uuid(data.id),
      new Uuid(data.userId),
      PatientDemographic.fromPrimitives(data.demographic),
      PatientBiometric.fromPrimitives(data.biometric),
      data.allergies.map((allergy: Primitives<Allergy>) => Allergy.fromPrimitives(allergy)),
      data.diseases.map((disease: Primitives<ChronicDisease>) => ChronicDisease.fromPrimitives(disease)),
      data.contacts.map((contact: Primitives<PatientContact>) => PatientContact.fromPrimitives(contact)),
      data.vaccines.map((vaccine: Primitives<Vaccine>) => Vaccine.fromPrimitives(vaccine)),
      data.surgeries.map((surgery: Primitives<Surgery>) => Surgery.fromPrimitives(surgery)),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt)
    );
  }

  static create(id: string, userId: string): Patient {
    return new Patient(
      new Uuid(id),
      new Uuid(userId),
      PatientDemographic.create('NN', 'NN', 'NN'),
      PatientBiometric.create(180, BloodTypes.OPositive, OrganDonors.No),
      [],
      [],
      [],
      [],
      [],
      DateValueObject.today(),
      DateValueObject.today()
    );
  }
}
