import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { SendHorizonal } from 'lucide-react';
import { FormEventHandler } from 'react';

type SendMessageForm = {
  sender_id: number;
  receiver_id: number;
  message: string;
};

export function SendMessage({
  senderId,
  receiverId,
}: {
  senderId: number;
  receiverId: number;
}) {
  const { data, setData, post, reset, processing, errors } = useForm<
    Required<SendMessageForm>
  >({
    sender_id: senderId,
    receiver_id: receiverId,
    message: '',
  });

  const handleSendMessage: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('chats.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('message');
      },
    });
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex space-x-3"
    >
      <Input
        type="text"
        placeholder="Type your message..."
        className="flex-1 border px-4 py-2"
        value={data.message}
        onChange={(e) => setData('message', e.target.value)}
      />

      <Button type="submit">
        <SendHorizonal /> Send
      </Button>
    </form>
  );
}
