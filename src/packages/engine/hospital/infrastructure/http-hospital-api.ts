export async function createHospital(data: { hospital: { adminId: string; name: string; address: any } }) {
  const response = await fetch('/api/v1/hospital', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
}
