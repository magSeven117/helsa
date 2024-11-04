import { gql, useApolloClient } from '@apollo/client';

export const useCreateHospital = () => {
  const client = useApolloClient();
  const createHospital = async (payload: any) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateHospital($hospital: HospitalInput!) {
          createHospital(hospital: $hospital)
        }
      `,
      variables: { hospital: payload },
    });
  };
  return {
    createHospital,
  };
};
