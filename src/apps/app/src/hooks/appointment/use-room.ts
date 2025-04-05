export const useRoom = () => {
  const enterRoom = async (appointmentId: string) => {
    try {
      await fetch(`/api/v1/appointment/${appointmentId}/room`, { method: 'PUT' });
    } catch (error) {
      throw new Error('Error entering room');
    }
  };

  return {
    enterRoom,
  };
};
