import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const CREATE_SCHEDULE = gql`
  mutation createSchedule($doctorId: ID!, $days: [DayInput]!) {
    createSchedule(doctorId: $doctorId, days: $days)
  }
`;
export const useCreateSchedule = () => {
  const [createSchedule, { loading, error, reset }] = useMutation(CREATE_SCHEDULE);

  return { createSchedule, loading, error, reset };
};
