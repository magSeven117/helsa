import { submitUserMessage } from '@/src/actions/chat/submit-user-message';
import { AIState, UIState } from '@/src/actions/chat/types';
import { updateChatState } from '@/src/actions/chat/update-chat-state';
import { createAI } from 'ai/rsc';

export const ChatAIProvider = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: {
    user: {
      id: '',
      name: '',
      image: '',
    },
    chatId: '',
    messages: [],
  },
  onSetAIState: updateChatState,
});
