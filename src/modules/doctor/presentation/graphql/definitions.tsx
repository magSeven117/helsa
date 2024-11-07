import gql from 'graphql-tag';

export const doctorSchema = gql`
  type Hour {
    hour: String
  }
  type Day {
    day: String
    hours: [Hour]
  }
  type Schedule {
    id: ID!
    appointmentDuration: Int
    maxAppointmentsPerDay: Int
    days: [Day]
  }

  type ConsultingRoomCoordinates {
    latitude: Float
    longitude: Float
  }

  type ConsultingRoomAddress {
    id: ID!
    address: String
    city: String
    coordinates: ConsultingRoomCoordinates
  }

  type Education {
    id: ID!
    title: String
    institution: String
    graduatedAt: DateTime
  }
  type Doctor {
    id: ID!
    userId: String!
    licenseMedicalNumber: String!
    specialtyId: String!
    score: Int
    experience: Int

    schedule: Schedule
    consultingRoomAddress: ConsultingRoomAddress
    educations: [Education]

    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Specialty {
    id: ID!
    name: String
  }

  input DoctorInput {
    id: String
    licenseMedicalNumber: String
    specialtyId: String
    experience: Float
    userId: String
  }

  input ConsultingRoomAddressInput {
    city: String
    address: String
  }

  input EducationInput {
    title: String
    institution: String
    graduatedAt: DateTime
  }

  type Mutation {
    createDoctor(doctor: DoctorInput!): Void
    updateDoctor(doctorId: ID, doctor: DoctorInput!): Void
    setConsultingRoom(doctorId: ID, consultingRoomAddress: ConsultingRoomAddressInput!): Void
    addEducation(doctorId: ID, education: EducationInput!): Void
    editEducation(doctorId: ID, educationId: ID, education: EducationInput!): Void
    removeEducation(doctorId: ID, educationId: ID): Void
  }

  type Query {
    specialties: [Specialty]
  }
`;
