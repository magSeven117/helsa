import { Aggregate } from '@helsa/ddd/core/aggregate';
import { DateValueObject } from '@helsa/ddd/core/value-object';
import { Uuid } from '@helsa/ddd/core/value-objects/uuid';
import { Primitives } from '@helsa/ddd/types/primitives';
import { User } from '../../user/domain/user';
import { BloodTypes, OrganDonors, PatientBiometric } from './members/biometric';
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

    createdAt: DateValueObject,
    updatedAt: DateValueObject,
    public user?: User,
    public contacts?: PatientContact[],
    public vaccines?: Vaccine[],
    public surgeries?: Surgery[]
  ) {
    super(id, createdAt, updatedAt);
  }

  toPrimitives(): Primitives<Patient> {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      demographic: this.demographic.toPrimitives(),
      biometric: this.biometric.toPrimitives(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      user: this.user ? this.user.toPrimitives() : undefined,
      contacts: this.contacts ? this.contacts.map((contact) => contact.toPrimitives()) : undefined,
      vaccines: this.vaccines ? this.vaccines.map((vaccine) => vaccine.toPrimitives()) : undefined,
      surgeries: this.surgeries ? this.surgeries.map((surgery) => surgery.toPrimitives()) : undefined,
    };
  }

  static fromPrimitives(data: Primitives<Patient>): Patient {
    return new Patient(
      new Uuid(data.id),
      new Uuid(data.userId),
      PatientDemographic.fromPrimitives(data.demographic),
      PatientBiometric.fromPrimitives(data.biometric),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
      data.user ? User.fromPrimitives(data.user) : undefined,
      data.contacts ? data.contacts.map((contact) => PatientContact.fromPrimitives(contact)) : undefined,
      data.vaccines ? data.vaccines.map((vaccine) => Vaccine.fromPrimitives(vaccine)) : undefined,
      data.surgeries ? data.surgeries.map((surgery) => Surgery.fromPrimitives(surgery)) : undefined
    );
  }

  static create(
    id: string,
    userId: string,
    demographic: {
      civilStatus: string;
      occupation: string;
      educativeLevel: string;
    },
    biometric: {
      height: number;
      bloodType: BloodTypes;
      organDonor: OrganDonors;
    }
  ): Patient {
    return new Patient(
      new Uuid(id),
      new Uuid(userId),
      PatientDemographic.create(demographic.civilStatus, demographic.occupation, demographic.educativeLevel),
      PatientBiometric.create(biometric.height, biometric.bloodType, biometric.organDonor),
      DateValueObject.today(),
      DateValueObject.today()
    );
  }

  updateDemographic(demographic: Partial<Primitives<PatientDemographic>>): void {
    this.demographic = this.demographic.update({
      ...this.demographic.toPrimitives(),
      ...demographic,
    });
  }

  updateBiometric(biometric: Partial<Primitives<PatientBiometric>>): void {
    this.biometric = this.biometric.update({
      ...this.biometric.toPrimitives(),
      ...biometric,
    });
  }
}
