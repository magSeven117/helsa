import { gql, useMutation } from '@apollo/client';

const UPDATE_HOSPITAL = gql`
  mutation UpdateHospital($hospitalId: ID!, $hospital: HospitalInput!) {
    updateHospital(hospitalId: $hospitalId, hospital: $hospital)
  }
`;

export const useUpdateHospital = () => {
  const [updateHospital, { error, loading }] = useMutation(UPDATE_HOSPITAL);

  return {
    updateHospital,
    error,
    loading,
  };
};
