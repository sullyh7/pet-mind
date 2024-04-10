import { User } from "@supabase/supabase-js";
import { create } from 'zustand'


export type Imessage = {
    created_at: string;
    edited: boolean;
    id: number;
    sentBy: string;
    text: string;
    profiles: {
        first_name: string | null;
        id: string;
        last_name: string | null;
        type: "owner" | "minder" | null;
        updated_at: string | null;
    } | null;
}[] | null

interface MessageState {
    messages: [];
}

export const useMessage = create<MessageState>()((set) => ({
    messages: [],
}))