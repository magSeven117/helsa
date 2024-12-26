export const POST = async () => {
  console.log('Keep alive cron job');

  return new Response('OK', { status: 200 });
};
