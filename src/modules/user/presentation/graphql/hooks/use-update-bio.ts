import { gql, useApolloClient } from '@apollo/client';

export const useUpdateBio = () => {
  const client = useApolloClient();
  const updateBio = async (bio: string) => {
    await client.mutate({
      mutation: gql`
        mutation UpdateBio($bio: String!) {
          updateBio(bio: $bio)
        }
      `,
      variables: {
        bio,
      },
    });
  };
  return {
    updateBio,
  };
};
