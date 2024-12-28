import { createClient } from '@helsa/supabase/client';
import { useEffect } from 'react';
import { v4 } from 'uuid';
import { Message, useMessage } from '../store/chat';
export const useMessages = (appointmentId: string) => {
  const { messages, addMessage, updateMessage, removeMessage, initMessages } = useMessage();
  const supabase = createClient();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: messages, error } = await supabase
        .from('Message')
        .select('*')
        .eq('appointmentId', appointmentId)
        .order('createdAt', { ascending: true });
      console.log(messages);
      if (error) {
        throw error;
      }
      initMessages(messages as Message[]);
    };
    fetchMessages();
  }, []);

  const sendMessage = async (message: Message) => {
    const { error } = await supabase
      .from('Message')
      .insert({ id: v4(), appointmentId, text: message.text, userId: message.userId });
    if (error) {
      throw error;
    }
  };

  const deleteMessage = async (messageId: string) => {
    const { error } = await supabase.from('Message').delete().eq('id', messageId);
    if (error) {
      throw error;
    }
  };

  const updateMessageText = async (messageId: string, text: string) => {
    if (!text) {
      return deleteMessage(messageId);
    }
    const { error } = await supabase.from('Message').update({ text }).eq('id', messageId);
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel('chat_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Message' }, (payload) => {
        const newMessage = payload.new;
        addMessage(newMessage as Message);
      })
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'Message', filter: `appointmentId=eq.${appointmentId}` },
        (payload) => {
          const deletedMessage = payload.old;
          removeMessage(deletedMessage.id);
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'Message', filter: `appointmentId=eq.${appointmentId}` },
        (payload) => {
          const updatedMessage = payload.new;
          updateMessage(updatedMessage.id, updatedMessage as Message);
        },
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  return {
    messages,
    sendMessage,
    deleteMessage,
    updateMessageText,
  };
};
