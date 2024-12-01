import { gql, useMutation } from '@apollo/client';

const UPDATE_BIO = gql`
  mutation UpdateBio($bio: String!) {
    updateBio(bio: $bio)
  }
`;

export const useUpdateBio = () => {
  const [updateBio, { loading, error }] = useMutation(UPDATE_BIO);
  return {
    updateBio,
    loading,
    error,
  };
};
