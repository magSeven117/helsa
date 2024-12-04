import { anthropic } from '@ai-sdk/anthropic';
import { CoreMessage } from 'ai';
import { streamUI } from 'ai/rsc';
import React from 'react';

export class ChatGenerator {
  async generateMessage({
    messages,
    text,
    loader,
    tools,
  }: {
    messages: CoreMessage[] | undefined;
    text: ({ content, done, delta }: { content: string; done: boolean; delta: string }) => React.ReactNode;
    loader: () => React.JSX.Element;
    tools?: {
      [key: string]: any;
    };
  }) {
    const result = await streamUI({
      model: anthropic('claude-3-sonnet-20240229'),
      initial: loader(),
      system: `\
      You are a helpful assistant in Helsa who can help users ask questions about their appointments, medical history, payments and schedule.
      
      If the user wants the next upcoming appointment, you can call the function \`getUpcomingAppointment()\`.
      Don't return markdown, just plain text.
  
      Always try to call the functions with default values, otherwise ask the user to respond with parameters.
      Current date is: ${new Date().toISOString().split('T')[0]} \n
      `,
      messages,
      text,
      tools,
    });
    return result;
  }
}
