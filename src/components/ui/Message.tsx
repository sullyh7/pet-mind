import { Imessage } from "@/lib/store/messages";
import { createClient } from "../../../utils/supabase/client";
import React from "react";

export default function Message({ message }: { message:Imessage }) {
    const supabase = createClient()

    return (
        <><div>
          <div>
            <h1>filler name</h1>
            <h1 className="text-gray-400">{new Date().toDateString()}</h1>
          </div>
        </div><p>
            {message.text}
          </p></>
      )
}