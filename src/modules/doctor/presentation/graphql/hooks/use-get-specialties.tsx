import { gql, useQuery } from '@apollo/client';

const GET_SPECIALTIES = gql`
  query GetSpecialties {
    specialties {
      id
      name
    }
  }
`;

export const useSpecialties = () => {
  const { data, loading, refetch, error } = useQuery(GET_SPECIALTIES);

  return {
    specialties: data?.specialties || [],
    loading,
    refetch,
    error,
  };
};
