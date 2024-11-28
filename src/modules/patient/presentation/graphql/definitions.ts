import gql from 'graphql-tag';

export const patientSchema = gql`
  enum OrganDonor {
    Yes
    No
  }
  type PatientBiometric {
    height: Float
    organDonor: OrganDonor
    bloodType: String
  }
  type PatientDemographic {
    civilStatus: String
    occupation: String
    educativeLevel: String
  }

  enum AllergySeverity {
    MILD
    MODERATE
    SEVERE
  }

  type Allergy {
    id: String!
    name: String
    description: String
    severity: AllergySeverity
    reaction: String
    diagnosticDate: DateTime
    patientId: String!
  }

  enum DiseaseState {
    ACTIVE
    INACTIVE
    CONTROLLED
  }

  enum ChronicDiseaseType {
    GENETIC
    AMBIENTAL
    HABITUAL
    INFECTIOUS
  }

  type ChronicDisease {
    id: String!
    type: ChronicDiseaseType
    description: String
    actualState: DiseaseState
    diagnosticDate: DateTime
  }

  enum ContactRelationship {
    Father
    Mother
    Brother
    Sister
    Grandfather
    Grandmother
    Uncle
    Aunt
    Cousin
    Other
  }

  type PatientContact {
    id: String!
    name: String
    phone: String
    relationship: ContactRelationship
  }

  type Vaccine {
    id: String!
    name: String
    dose: Int
    date: DateTime
    notes: String
    nextDose: DateTime
  }

  type Surgery {
    id: String!
    date: DateTime
    type: String
    details: String
    surgeon: String
    hospital: String
  }

  type Patient {
    id: String!
    userId: String!
    demographic: PatientDemographic!
    biometric: PatientBiometric!
    allergies: [Allergy]
    diseases: [ChronicDisease]
    contacts: [PatientContact]
    vaccines: [Vaccine]
    surgeries: [Surgery]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input PatientDemographicInput {
    civilStatus: String
    occupation: String
    educativeLevel: String
  }

  input PatientBiometricInput {
    height: Float
    organDonor: OrganDonor
    bloodType: String
  }

  input PatientInput {
    id: String!
    userId: String!
    demographic: PatientDemographicInput
    biometric: PatientBiometricInput
  }

  type Mutation {
    createPatient(patient: PatientInput!): Void
    updateDemographic(patientId: String!, demographic: PatientDemographicInput!): Void
    updateBiometric(patientId: String!, biometric: PatientBiometricInput!): Void
  }
`;
