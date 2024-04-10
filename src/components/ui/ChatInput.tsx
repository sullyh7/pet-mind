"use client";

import React from "react"
import { Input } from "./input"
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useToast } from '@/components/ui/use-toast';
import { createClient } from "../../../utils/supabase/client";

export default function ChatInput() {
    const supabase = createClient()
    const { toast } = useToast();
    const handleSendMessage = async (text:string) => {
        const { error } = await supabase.from("messages").insert({ text });
        if (error) {
            toast({
                title: "Error sending message.",
                variant: "destructive",
                description:error.message
            })
        }
    }

    return (
        <div>
            <Input 
                placeholder="send message" 
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSendMessage(e.currentTarget.value);
                        e.currentTarget.value = "";
                    }
                }}
            />
        </div>
    )
}
