import gql from 'graphql-tag';

export const hospitalSchema = gql`
  type HospitalAddressCoordinates {
    latitude: Float
    longitude: Float
  }

  type HospitalAddress {
    id: ID!
    street: String
    city: String
    country: String
    zipCode: String
    coordinates: HospitalAddressCoordinates
  }
  type Hospital {
    id: ID!
    name: String
    adminId: ID!
    address: HospitalAddress
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input HospitalAddressCoordinatesInput {
    latitude: Float
    longitude: Float
  }
  input HospitalAddressInput {
    street: String
    city: String
    country: String
    zipCode: String
    coordinates: HospitalAddressCoordinatesInput
  }

  input HospitalInput {
    adminId: ID
    name: String
    address: HospitalAddressInput
  }

  type Mutation {
    createHospital(hospital: HospitalInput!): Void
    updateHospital(hospitalId: ID!, hospital: HospitalInput!): Void
  }
`;
