import React from 'react'
import { createClient } from '../../../../utils/supabase/server'
import Image from 'next/image';
import BookForm from '@/components/BookForm';
import ReviewForm from '@/components/ReviewForm';

const ReviewPage = async ({ params }: { params: { minderid: string } }) => {
    const client = createClient();
    const minder = (await client.from("minder_profiles").select("*").eq("id", params.minderid).single()).data;
    const reviews = (await client.from("reviews").select("*").eq("minder_id", params.minderid)).data

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
                <ReviewForm minder_id={minder.id} rating={minder.rating || 0}/>
            </div>
            <div>
                <h1 className='text-xl mt-5'>Ratings:</h1>
                {reviews?.map(rev => <div key={rev.id} className='p-3 b-1 bg-primary rounded-lg flex flex-col items-left justify-center'>
                    <h1 className='text-2xl'>{rev.review_text}</h1>
                    <h1 className='font-xl'>Rating: {rev.rating}</h1>
                    </div>)}
            </div>
        </div>
    )
}

export default ReviewPage;