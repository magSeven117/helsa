import { gql, useMutation } from '@apollo/client';

const UPDATE_DEMOGRAPHIC = gql`
  mutation UpdateDemographic($patientId: String!, $demographic: PatientDemographicInput!) {
    updateDemographic(patientId: $patientId, demographic: $demographic)
  }
`;

export const useUpdateDemographic = () => {
  const [updateDemographic, { error, loading }] = useMutation(UPDATE_DEMOGRAPHIC);

  return {
    updateDemographic,
    error,
    loading,
  };
};
