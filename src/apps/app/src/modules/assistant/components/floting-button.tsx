'use client';
import { useChat } from '@ai-sdk/react';
import { Button } from '@helsa/ui/components/button';
import { Input } from '@helsa/ui/components/input';
import { ScrollArea } from '@helsa/ui/components/scroll-area';
import { useEnterSubmit } from '@helsa/ui/hooks/use-enter-submit';
import { useScrollAnchor } from '@helsa/ui/hooks/use-scroll-anchor';
import { Send, X } from 'lucide-react';
import { motion, useAnimate } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useOnClickOutside } from 'usehooks-ts';
import { v4 } from 'uuid';
import { useSession } from '../../../app/(app)/(main)/_components/session-provider';
import { ChatEmpty } from '../../chat/components/chat-empty';
import { ChatExamples } from '../../chat/components/chat-examples';
import { ChatList } from '../../chat/components/chat-list';
import { convertToUIMessages } from '../../chat/components/utils';
import { useOneChat } from '../hooks/use-chats';
import { Header } from './header';
import { SidebarList } from './sidebar-list';
export const ChatFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [chatRef, animateChat] = useAnimate();
  const [isExpanded, setExpanded] = useState(false);
  const [chatId, setChatId] = useState<string>();
  const { user } = useSession();
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const { chat } = useOneChat(chatId);
  const [isHovered, setIsHovered] = useState(false);
  const { messagesRef, scrollRef, visibilityRef, scrollToBottom } = useScrollAnchor();
  const toggleOpen = () => setExpanded((prev) => !prev);
  useOnClickOutside(scope, () => {
    if (isOpen) {
      handleClose();
    }
  });
  const { formRef, onKeyDown } = useEnterSubmit();

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleClose = async () => {
    await animateChat(chatRef.current, {
      scaleY: 0,
    });
    await animate(scope.current, {
      width: 0,
      opacity: 0,
      y: 0,
    });
    setIsOpen(false);
  };

  const { messages, input, setInput, handleSubmit, setMessages } = useChat({
    initialMessages,
    body: {
      chatId,
      user,
    },
    api: '/api/v1/chat',
  });

  const showExamples = messages.length === 0 && !input;
  useEffect(() => {
    requestAnimationFrame(() => {
      inputRef?.current?.focus();
    });
  }, [messages]);

  const onNewChat = () => {
    const newChatId = v4();
    setInput('');
    setExpanded(false);
    setMessages([]);
    setChatId(newChatId);
  };

  const handleOnSelect = (id: string) => {
    setExpanded(false);
    setChatId(id);
  };

  useHotkeys('meta+l', () => onNewChat(), {
    enableOnFormTags: true,
  });

  useEffect(() => {
    if (chat) {
      const retrivedMessages = convertToUIMessages(chat.messages as any[]);
      setMessages(retrivedMessages);
      setInitialMessages(retrivedMessages);
    }
  }, [chat]);

  if (isOpen) {
    return (
      <motion.div
        initial={{ width: 0, opacity: 0, y: 0 }}
        animate={{ width: '44%', opacity: 1, y: 1 }}
        ref={scope}
        className="fixed origin-center bottom-4 left-1/2  z-50 flex items-center justify-center  p-3 bg-background rounded-md border translate-x-[-50%] "
      >
        <Button onClick={handleClose} variant={'ghost'} size={'icon'}>
          <X />
        </Button>
        <form
          action=""
          className="flex-1"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const newId = v4();
            if (!chatId) {
              setChatId(newId);
            }
            handleSubmit(e, {
              body: {
                chatId: chatId || newId,
                user,
              },
            });
            scrollToBottom();
          }}
        >
          <Input
            className="focus-visible:ring-0 focus-visible:ring-transparent border-none"
            placeholder="En que te puedo ayudar?"
            autoFocus
            value={input}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
            onKeyDown={onKeyDown}
          />
        </form>
        <Button
          onClick={(e) => {
            const newId = v4();
            if (!chatId) {
              setChatId(newId);
            }
            handleSubmit(e, {
              body: {
                chatId: chatId || newId,
                user,
              },
            });
            scrollToBottom();
          }}
          variant={'ghost'}
          size={'icon'}
        >
          <Send />
        </Button>
        <motion.div
          initial={{ scaleY: 0 }}
          transition={{ delay: 0.5 }}
          animate={{ scaleY: 1 }}
          ref={chatRef}
          className="w-full origin-bottom h-[600px] absolute bottom-[70px] flex flex-col  border rounded-md bg-background overflow-hidden"
        >
          <SidebarList
            onNewChat={onNewChat}
            isExpanded={isExpanded}
            setExpanded={setExpanded}
            onSelect={handleOnSelect}
            chatId={chatId}
          />
          <Header toggleSidebar={toggleOpen} isExpanded={isExpanded} />
          <div className="relative h-full flex flex-col pb-4">
            <ScrollArea className="md:h-[500px]" ref={scrollRef}>
              <div ref={messagesRef}>
                {messages.length ? (
                  <ChatList messages={messages} className="p-4 pb-8" />
                ) : (
                  <ChatEmpty firstName={user?.name.value.split(' ').at(0) ?? ''} />
                )}
                <div className="w-full h-px" ref={visibilityRef} />
              </div>
            </ScrollArea>
            {showExamples && <ChatExamples onSubmit={handleSubmit} setInput={setInput} />}
          </div>
        </motion.div>
      </motion.div>
    );
  }
  return (
    <motion.button
      className="flex items-center justify-center bg-primary text-background  gap-2  rounded-md overflow-hidden fixed origin-center bottom-4 left-1/2 z-50 p-2 cursor-pointer translate-x-[-50%] "
      initial={{ width: '48px', height: '48px' }}
      animate={{
        scale: isHovered ? 1.3 : 1,
      }}
      transition={{
        duration: 0.2,
        type: 'spring',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        setIsOpen(true);
        setIsHovered(false);
      }}
    >
      <img src={'/images/bot.png'} className="size-6 hidden dark:block" alt="" />
      <img src={'/images/bot-white.png'} className="size-6 block dark:hidden" alt="" />
    </motion.button>
  );
};
