"use client";
import React, { useEffect, useState } from 'react'
import { createClient } from '../../../../../utils/supabase/client'
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Message {
    booking_id: number | null;
    id: number;
    message_text: string | null;
    user_id: string | null;
}


const BookingChat = ({ params }: { params: { bookingid: number } }) => {

    const [msgs, setMsgs] = useState<Message[] | any>([])
    const client = createClient();
    const [user, setUser] = useState<User | null>();
    const [input, setInput] = useState("");
    const {toast} = useToast();
    
    useEffect(() => {
        client.auth.onAuthStateChange((_, b) => {
            console.log(b?.user.email);
            setUser(b?.user)
        }) 
        client.auth.getUser()
        .then((u) => {setUser(u.data.user)})
    }, [client.auth])

    useEffect(() => {
        const posts = client.from("messages").select("*").eq("booking_id", params.bookingid).then(m => setMsgs(m.data || []));
        const channel = client
        .channel('realtime messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages'}, (payload) => {
            if (payload.new.booking_id == params.bookingid) {
                setMsgs((prev: any) => [payload.new, ...prev]);
            }
            
        })
        .subscribe()

        return () => {
            client.removeChannel(channel);
        }
    }, [client, params.bookingid])
    
    return (
        <div>
            <ScrollArea className='gap-y-2 h-[15rem]'>
                {msgs.map((m: { id: React.Key | null | undefined; message_text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; user_id: string | undefined; }) => <div key={m.id} className='bg-primary p-3 border'>
                    <h1 className='text-lg'>{m.message_text}</h1>
                    <p className='text-sm'>{m.user_id == user?.id ? "You" : "Them:"}</p>
                </div>)}
            </ScrollArea>
            <Input value={input} onChange={(e) => setInput(e.target.value)}/>
            <Button onClick={() => {
                client.from("messages").insert({
                    booking_id: params.bookingid,
                    message_text: input,
                }).then(resp => {
                    if (resp.error) {
                        toast({
                            title: "Error sending message",
                            description: resp.error.message,
                            variant: "destructive"
                        })
                        return;
                    }
                    toast({
                        title: "Message sent",
                    })
                })
            }}>Send</Button>
        </div>
    )
}

export default BookingChat