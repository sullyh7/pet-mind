import React, { Suspense } from "react";
import ListMessages from "./ListMessages";
import { createClient } from "../../../utils/supabase/client";
import InitMessages from "@/lib/store/InitMessages";

export default async function Chat() {
    const supabase = createClient()

    const { data } = await supabase.from("messages").select("*,profiles(*)")

    return (
        <Suspense fallback={"loading..."}>
            <ListMessages />
            <InitMessages messages={data || []} />
        </Suspense>
    )
}