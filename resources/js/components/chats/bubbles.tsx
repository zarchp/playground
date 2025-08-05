import { Chat } from '@/types';
import { useEcho } from '@laravel/echo-react';
import { useState } from 'react';

export function Bubbles({
  chats,
  senderId,
  receiverId,
}: {
  chats: Chat[];
  senderId: number;
  receiverId: number;
}) {
  /* const [localChats, setLocalChats] = useState<Chat[]>(chats);

  useEcho(`chat.${senderId}`, 'MessageSent', ({ chat }: { chat: Chat }) => {
    console.log(chat);

    // setLocalChats([...localChats, chat]);
    setLocalChats((prev) => [...prev, chat]);

    console.log(localChats);
  }); */

  return chats.map(({ id, sender_id, message, created_at }) => (
    <div
      key={id}
      className={`flex ${sender_id === senderId ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`relative max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
          sender_id === senderId
            ? 'rounded-tr-none bg-chart-2 text-white dark:bg-chart-4'
            : 'rounded-tl-none bg-white dark:bg-slate-700'
        }`}
      >
        <p className="text-sm">{message}</p>
        <p className={`mt-1 text-right text-xs opacity-70`}>
          {created_at.slice(11, 16)}
        </p>
        <div
          className={`absolute top-0 h-2 w-2 overflow-hidden ${
            sender_id === senderId ? '-right-2' : '-left-2'
          }`}
        >
          <div
            className={`absolute h-4 w-2 transform ${
              sender_id === senderId
                ? 'left-0 origin-top-right rotate-45 bg-chart-2 dark:bg-chart-4'
                : 'right-0 origin-top-left -rotate-45 bg-white dark:bg-slate-700'
            }`}
          ></div>
        </div>
      </div>
    </div>
  ));
}
