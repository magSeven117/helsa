import { keys } from '../keys';
const env = keys().NEXT_PUBLIC_BASE_URL;
export const sendVerification = async (email: string, code: string) => {
  try {
    const response = await fetch(`${env}/api/v1/notifications/verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to send verification email');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Could not send verification email. Please try again later.');
  }
};
