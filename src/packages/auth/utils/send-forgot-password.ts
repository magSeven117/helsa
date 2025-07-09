export const sendForgotPassword = async (email: string, code: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/notifications/forgot-password`, {
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
      throw new Error('Failed to send forgot password email');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending forgot password email:', error);
    throw new Error('Could not send forgot password email. Please try again later.');
  }
};
