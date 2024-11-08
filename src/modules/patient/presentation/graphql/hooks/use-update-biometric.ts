import { gql, useMutation } from '@apollo/client';

const UPDATE_BIOMETRIC = gql`
  mutation UpdateBiometric($patientId: String!, $biometric: PatientBiometricInput!) {
    updateBiometric(patientId: $patientId, biometric: $biometric)
  }
`;

export const useUpdateBiometric = () => {
  const [updateBiometric, { error, loading }] = useMutation(UPDATE_BIOMETRIC);

  return {
    updateBiometric,
    error,
    loading,
  };
};
