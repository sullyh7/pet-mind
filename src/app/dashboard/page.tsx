import React from 'react'
import { createClient } from '../../../utils/supabase/server'
import BookingsView from '@/components/BookingsView';

const Dashboard = async () => {
    const client = createClient();
    const user = await client.auth.getUser()
    const profile = await client.from("profiles").select("*").single();

    if (!user.data.user || !profile.data) {
        return <h1>Please sign in.</h1>
    }
  return (
    <div>
        <h1 className='font-bold text-4xl sm:text-5xl'>Welcome back <span className='text-[#DB3066]'>{profile.data.first_name}</span></h1>
        <BookingsView/>
    </div>
  )
}

export default Dashboard