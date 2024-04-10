import React from 'react'
import { createClient } from '../../../../utils/supabase/server'
import Image from 'next/image';
import { TimePicker } from '@/components/ui/time-picker';
import { Calendar } from '@/components/ui/calendar';
import { bookFormSchema } from '@/lib/form/book';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Button } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import BookForm from '@/components/BookForm';

const BookPage = async ({ params }: { params: { minderid: string } }) => {
    const client = createClient();
    const minder = (await client.from("minder_profiles").select("*").eq("id", params.minderid).single()).data;

    

    if (!minder) {
        return <h1>Error retreiving minder information</h1>
    }
    return (
        <div>
            <div className="flex flex-row items-center gap-x-5 w-full justify-between p-5 rounded bg-primary">
                <Image src={minder.avatar_url?.substring(1)!} alt={minder.first_name!} width={150} height={150} />
                <div className="text-left flex flex-col gap-y-3 w-full">
                    <h1 className="text-1xl font-bold">{minder.first_name + " " + minder.last_name}</h1>
                    <p>{minder.location}</p>
                    <p>Description: {minder.description}</p>
                    <p>Rating: {minder.rating == 0 ? "No ratings" : minder.rating}</p>
                </div>
            </div>
            <div>
                <BookForm minder_id={minder.id}/>
            </div>
        </div>
    )
}

export default BookPage