import { gql, useApolloClient } from '@apollo/client';

export const useCreatePatient = () => {
  const client = useApolloClient();
  const createPatient = async (payload: {
    id: string;
    userId: string;
    biometric: {
      height?: number;
      bloodType?: string;
      organDonor?: string;
    };
    demographic: {
      civilStatus?: string;
      occupation?: string;
      educationLevel?: string;
    };
  }) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreatePatient($patient: PatientInput!) {
          createPatient(patient: $patient)
        }
      `,
      variables: { patient: payload },
    });
    return data;
  };

  return {
    createPatient,
  };
};
