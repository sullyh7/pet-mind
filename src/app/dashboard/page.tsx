import React from 'react';
import { createClient } from '../../../utils/supabase/server';
import BookingsView from '@/components/BookingsView';
import {Button} from '@/components/ui/button';
import Link from 'next/link'



const Dashboard = async () => {
    const client = createClient();
    const user = await client.auth.getUser();
    const profile = await client.from("profiles").select("*").single();

    return (
        <div>
            {profile.data && (
                <div>
                    <h1 className='font-bold text-4xl sm:text-5xl'>
                        Welcome back <span className='text-[#DB3066]'>{profile.data.first_name}</span>
                    </h1>
                    <BookingsView />
                </div>
            )}
        </div>
    );
};

export default Dashboard;