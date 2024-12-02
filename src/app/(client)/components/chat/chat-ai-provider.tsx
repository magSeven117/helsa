import { submitUserMessage } from '@/app/(server)/actions/chat/submit-user-message';
import { AIState, UIState } from '@/app/(server)/actions/chat/types';
import { updateChatState } from '@/app/(server)/actions/chat/update-chat-state';
import { createAI } from 'ai/rsc';

export const ChatAIProvider = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  onSetAIState: updateChatState,
});
