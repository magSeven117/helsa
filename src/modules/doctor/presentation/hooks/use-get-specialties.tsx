import { gql, useApolloClient } from "@apollo/client";

export const useGetSpecialties = () => {
  const client = useApolloClient();
  const getSpecialties = async () => {
    const { data } = await client.query({
      query: gql`
        query GetSpecialties {
          specialties {
            id
            name
          }
        }
      `,
    });

    return data.specialties;
  }

  return {
    getSpecialties
  }
}