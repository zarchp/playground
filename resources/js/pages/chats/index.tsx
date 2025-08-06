import { Bubbles } from '@/components/chats/bubbles';
import { Header } from '@/components/chats/header';
import { SendMessage } from '@/components/chats/send-message';
import AppLayout from '@/layouts/app-layout';
import { Chat, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useEffect, useRef, useState } from 'react';

export default function Index({
  chats,
  senderId,
  receiverId,
  receiverName,
}: {
  chats: Chat[];
  senderId: number;
  receiverId: number;
  receiverName: string;
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Home',
      href: route('home'),
    },
    {
      title: 'Chats',
      href: route('chats.index'),
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  //   const isFirstRender = useRef(true);

  const [localChats, setLocalChats] = useState<Chat[]>(chats);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: 'instant' });
    // if (isFirstRender.current) {
    //   isFirstRender.current = false;
    // }
  }, [localChats]);

  useEcho(`chat.${senderId}`, 'MessageSent', ({ chat }: { chat: Chat }) => {
    console.log(chat);

    setLocalChats((prev) => [...prev, chat]);

    console.log(localChats);
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Chats" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="relative flex min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <div className="w-80 border-r">Users</div>
          <div className="flex flex-1 flex-col">
            <div className="border-b px-6 py-4">
              <Header receiverName={receiverName} />
            </div>
            <div
              ref={containerRef}
              className="h-0 flex-auto space-y-4 overflow-y-auto bg-slate-100 px-6 py-4 dark:bg-slate-950"
            >
              <Bubbles
                chats={localChats}
                senderId={senderId}
                receiverId={receiverId}
              />
            </div>
            <div className="border-t px-6 py-4">
              <SendMessage
                senderId={senderId}
                receiverId={receiverId}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
