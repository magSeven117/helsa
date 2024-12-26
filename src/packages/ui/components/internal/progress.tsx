'use client';

import { AppProgressBar } from 'next-nprogress-bar';

const Progress = () => {
  return <AppProgressBar options={{ showSpinner: false }} color="#8167EC" />;
};

export default Progress;
