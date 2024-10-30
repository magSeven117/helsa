import { gql, useApolloClient } from "@apollo/client";

export const useCreateDoctor = () => {
  const client = useApolloClient();
  const createDoctor = async (payload: {id: string, licenseMedicalNumber: string; specialtyId: string, userId: string }) => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation CreateDoctor($doctor: DoctorInput!) {
          createDoctor(doctor: $doctor)
        }
      `,
      variables: { doctor: payload },
    });

    return data.createDoctor;
  }
  return {
    createDoctor
  }
}