import React from 'react'
import BookingsView from '@/components/BookingsView';
import {Button} from '@/components/ui/button';
import Link from 'next/link'
import { createClient } from '../../../../utils/supabase/server';



const Dashboard = async () => {
    const client = createClient();
    const user = await client.auth.getUser()
    const profile = await client.from("owner_profiles").select("*").eq("id", user.data.user?.id || "").single();
    const bookings = (await client.from("bookings").select("*").eq("owner_id", user.data.user?.id || ""))

  return (
    <>
    {profile.data && <div>
    <h1 className='font-bold text-4xl sm:text-5xl'>Welcome back <span className='text-[#DB3066]'>{profile.data.first_name}</span></h1>
    <BookingsView bookings={bookings.data} owner={true}/>
</div> }

    
    </>
    
  )
}

export default Dashboard;

