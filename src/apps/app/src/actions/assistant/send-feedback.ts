'use server';
export async function sendFeedback({ feedback }: { feedback: string }) {
  console.log('Feedback:', feedback);
}
