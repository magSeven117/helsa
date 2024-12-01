import { Patient } from '@/modules/patient/domain/patient';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { gql, useMutation } from '@apollo/client';

const CREATE_PATIENT = gql`
  mutation CreatePatient($patient: PatientInput!) {
    createPatient(patient: $patient)
  }
`;

export const useCreatePatient = () => {
  const [createPatient, { loading, error }] = useMutation<Primitives<Patient>>(CREATE_PATIENT);

  return {
    createPatient,
    loading,
    error,
  };
};
