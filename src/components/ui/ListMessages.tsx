"use client"

import React from 'react';
import { useMessage } from '@/lib/store/messages';
import Message from './Message';

const ListMessages = () => {
    const messages = useMessage((state)=>state.messages)

    return (
        <div className="">
          <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
            <div className="flex-1">
                
            </div>
            <div>
              {messages.map((value,index) => {
                return (
                  <Message key={index} message={value} />
                )
              })}
            </div>
          </div>
        </div>
      );
};

export default ListMessages