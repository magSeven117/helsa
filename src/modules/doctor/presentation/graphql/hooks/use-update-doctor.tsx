import { Doctor } from "@/modules/doctor/domain/doctor";
import { Primitives } from "@/modules/shared/domain/types/primitives";
import { gql, useApolloClient } from "@apollo/client";

export const useUpdateDoctor = () => {
  const client = useApolloClient();
  
  const updateDoctor = async (doctorId: string, doctor: Partial<Primitives<Doctor>>) => {
    await client.mutate({
      mutation: gql`
        mutation UpdateDoctor($doctorId: ID!, $doctor: DoctorInput!) {
          updateDoctor(doctorId: $doctorId, doctor: $doctor)
        }
      `,
      variables: {
        doctorId,
        doctor
      }
    });
  }

  return {
    updateDoctor
  }
}