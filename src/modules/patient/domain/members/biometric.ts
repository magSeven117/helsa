import { NumberValueObject } from '@/modules/shared/domain/core/value-object';
import { Enum } from '@/modules/shared/domain/core/value-objects/enum';
import { Primitives } from '@/modules/shared/domain/types/primitives';

export class PatientBiometric {
  constructor(public height: NumberValueObject, public bloodType: BloodType, public organDonor: OrganDonor) {}
  toPrimitives() {
    return {
      height: this.height.value,
      bloodType: this.bloodType.value,
      organDonor: this.organDonor.value,
    };
  }

  static fromPrimitives(primitives: Primitives<PatientBiometric>): PatientBiometric {
    return new PatientBiometric(
      new NumberValueObject(primitives.height),
      new BloodType(primitives.bloodType),
      new OrganDonor(primitives.organDonor)
    );
  }

  static create(height: number, bloodType: BloodTypes, organDonor: OrganDonors): PatientBiometric {
    return new PatientBiometric(new NumberValueObject(height), new BloodType(bloodType), new OrganDonor(organDonor));
  }
}

export enum BloodTypes {
  APositive = 'A+',
  ANegative = 'A-',
  BPositive = 'B+',
  BNegative = 'B-',
  ABPositive = 'AB+',
  ABNegative = 'AB-',
  OPositive = 'O+',
  ONegative = 'O-',
}

export class BloodType extends Enum<BloodTypes> {
  constructor(value: BloodTypes) {
    super(value, Object.values(BloodTypes));
  }
}

export enum OrganDonors {
  Yes = 'Yes',
  No = 'No',
}

export class OrganDonor extends Enum<OrganDonors> {
  constructor(value: OrganDonors) {
    super(value, Object.values(OrganDonors));
  }
}
