import { gql, useMutation } from '@apollo/client';

const SIGN_UP = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user)
  }
`;

export const useRegister = () => {
  const [register, { loading, error }] = useMutation(SIGN_UP);

  return {
    register,
    loading,
    error,
  };
};
