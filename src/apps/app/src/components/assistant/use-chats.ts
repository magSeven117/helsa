import { Chat } from '@helsa/engine/chat/domain/chat';
import { useQuery } from '@tanstack/react-query';
import { addMonths, addWeeks, isAfter, isBefore, isToday } from 'date-fns';

export const useOneChat = (chatId: string | undefined) => {
  const {
    data: chat,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      if (!chatId) return null;
      const response = await fetch(`/api/v1/chat/${chatId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data as Chat;
    },
    enabled: () => !!chatId,
    refetchOnWindowFocus: false,
  });
  return {
    chat,
    isLoading,
    error,
  };
};

export const useChats = () => {
  const {
    data: chats,
    isLoading,
    error,
  } = useQuery({
    initialData: {
      '1d': [],
      '7d': [],
      '30d': [],
    },
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await fetch('/api/v1/chat', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (!data.data.length) {
        return [];
      }

      const base: { '1d': Chat[]; '7d': Chat[]; '30d': Chat[] } = {
        '1d': [],
        '7d': [],
        '30d': [],
      };

      for (const obj of data.data) {
        const currentDate = new Date(obj.createdAt);

        if (isToday(currentDate)) {
          base['1d'].push(obj);
        }

        if (!isToday(currentDate) && isBefore(currentDate, addWeeks(currentDate, 1))) {
          base['7d'].push(obj);
        }

        if (isAfter(currentDate, addWeeks(currentDate, 1)) && isBefore(currentDate, addMonths(currentDate, 1))) {
          base['30d'].push(obj);
        }
      }

      return base;
    },
    refetchOnWindowFocus: false,
  });
  return {
    chats,
    isLoading,
    error,
  };
};
