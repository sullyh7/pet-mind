import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Button } from './button'

const Hero = () => {
    return (
        <div className=' sm:text-left text-center flex justify-between items-center flex-col sm:flex-row gap-x-5 gap-y-5'>
            <div className='flex flex-col items-center gap-y-5'>
                <h1 className=' text-5xl sm:text-5xl md:text-7xl sm:font-bold font-extrabold'>
                    {"Your Pet's Home, Away from Home"}
                </h1>
                <div className='flex flex-col gap-y-1 w-[50%] sm:w-full sm:flex-row justify-start gap-x-3'>
                    <Link href={"/search"}>
                        <Button className='bg-[#db3066] text-background' size={"lg"}>Schedule a booking</Button>
                    </Link>
                    <Link href={"/about-us"}><Button size={"lg"}>About Us</Button></Link>
                </div>
            </div>

            <Image src={"home/hero.svg"} width={400} height={10} alt='Pet' />
        </div>
    )
}

export default Hero
