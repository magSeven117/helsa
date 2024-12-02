export type Message = {
  id: string;
  role: string;
  content: any;
};

export type Chat = {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  messages: Message[];
};
