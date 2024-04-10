import React from 'react';
import Image from 'next/image';
import ChatInput from '@/components/ui/ChatInput';
import ListMessages from '@/components/ui/ListMessages';
import Chat from '@/components/ui/Chat';

const Message = () => {
  return (
    <div className="">
      <div>
        <Chat />
        <ChatInput />
      </div>
    </div>
  );
};

export default Message
