import { gql, useApolloClient } from "@apollo/client";

export const useEditEducation = () => {
  const client = useApolloClient();
  const editEducation = async (doctorId: string, educationId: string, education: any) => {
    await client.mutate({
      mutation: gql`
        mutation EditEducation($doctorId: ID!, $educationId: ID!, $education: EducationInput!) {
          editEducation(doctorId: $doctorId, educationId: $educationId, education: $education)
        }
      `,
      variables: {
        doctorId,
        educationId,
        education,
      },
    });
  };

  return { editEducation };
}