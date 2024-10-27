import { gql, useApolloClient } from '@apollo/client';

export const useRegister = () => {
  const client = useApolloClient();

  const register = async (payload: {
    email: string;
    externalId: string;
    id: string;
    role: string;
    additionalData: any;
  }) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateUser($user: UserInput!) {
          createUser(user: $user)
        }
      `,
      variables: { user: payload },
    });

    return data.signUp;
  };
  return {
    register,
  };
};
