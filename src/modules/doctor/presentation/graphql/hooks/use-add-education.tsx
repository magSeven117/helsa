import { gql, useApolloClient } from '@apollo/client';

export const useAddEducation = () => {
  const client = useApolloClient();
  const addEducation = async (doctorId: string, education: any) => {
    await client.mutate({
      mutation: gql`
        mutation AddEducation($doctorId: ID!, $education: EducationInput!) {
          addEducation(doctorId: $doctorId, education: $education)
        }
      `,
      variables: {
        doctorId,
        education,
      },
    });
  };

  return { addEducation };
};
