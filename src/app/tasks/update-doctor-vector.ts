import { task } from '@trigger.dev/sdk/v3';

export const UpdateDoctorVectorTask = task({
  id: 'update-doctor-vector',
  maxDuration: 300,
  run: async (payload: any, { ctx }) => {
    const { doctorId } = payload;

    return {
      message: 'Doctor vector updated',
    };
  },
});
