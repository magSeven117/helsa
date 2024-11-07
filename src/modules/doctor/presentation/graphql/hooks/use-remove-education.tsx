import { gql, useApolloClient } from "@apollo/client";

export const useRemoveEducation = () => {
  const client = useApolloClient();
  const removeEducation = async (doctorId: string, educationId: string) => {
    await client.mutate({
      mutation: gql`
        mutation removeEducation($doctorId: ID!, $educationId: ID!) {
          removeEducation(doctorId: $doctorId, educationId: $educationId)
        }
      `,
      variables: { doctorId, educationId },
    });
  }
  return { removeEducation };
}