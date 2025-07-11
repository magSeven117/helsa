export async function updateUser(data: Record<string, any>) {
  const response = await fetch('/api/v1/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: { message: string } = await response.json();
    throw new Error(error.message);
  }
}
