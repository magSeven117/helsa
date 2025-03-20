'use server';

export async function ping() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    message: 'pong',
  };
}
