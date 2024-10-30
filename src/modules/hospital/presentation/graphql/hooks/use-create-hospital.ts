import { Hospital } from '@/modules/hospital/domain/hospital';
import { Primitives } from '@/modules/shared/domain/types/primitives';
import { gql, useApolloClient } from '@apollo/client';

export const useCreateHospital = () => {
  const client = useApolloClient();
  const createHospital = async (payload: Partial<Primitives<Hospital>>) => {
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
