import { helloWorldTask } from '@/app/tasks/example';
export const eventsConfig: EventConfig[] = [
  {
    aggregate: 'doctor',
    globalTasks: [helloWorldTask.id],
    events: {},
  },
];

type EventConfig = {
  aggregate: string;
  globalTasks: string[];
  events: {
    [key: string]: {
      task: string[];
    };
  };
};
