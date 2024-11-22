import { tasks } from '@trigger.dev/sdk/v3';
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { eventsConfig } from './events.config';

export const POST = verifySignatureAppRouter(async (request: NextRequest) => {
  try {
    // Get the event info
    const { type, extra_data } = await request.json();
    const aggregate = type.split('.')[0];
    const event = type.split('.')[1];

    // Get the config for the event
    const config = eventsConfig.find((conf) => conf.aggregate === aggregate);
    const taskKeys = [...config.globalTasks, ...config.events[event].tasks];

    //Setup and execute the jobs
    const jobs = taskKeys.map((key) => tasks.trigger(key, extra_data));
    await Promise.all(jobs);
  } catch (error) {
    console.log('[ERROR EVENT HANDLER]', error);
    return new NextResponse(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
});
