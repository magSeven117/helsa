import { gql, useApolloClient } from "@apollo/client"

export const useSetConsultingRoom = () => {
  const client = useApolloClient()
  const setConsultingRoom = async (doctorId: string, data: { city: string, address: string }) => {
    await client.mutate({
      mutation: gql`
        mutation SetConsultingRoom($doctorId: ID!, $consultingRoomAddress: ConsultingRoomAddressInput!) {
          setConsultingRoom(doctorId: $doctorId, consultingRoomAddress: $consultingRoomAddress)
        }
      `,
      variables: {
        doctorId,
        consultingRoomAddress: data
      }
    })
  }
  return {
    setConsultingRoom
  }
}