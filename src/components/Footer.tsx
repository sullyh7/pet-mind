import React from 'react'
import Image from 'next/image'
import { navLinks } from '../lib/constants'
import Link from 'next/link'

const Footer = () => {
    return (
        <div className='flex-col flex sm:flex-row gap-y-2 justify-between items-center'>

            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <Image src={"/logos/logo.png"} alt='Logo' width={90} height={10} />
                    <div>
                        <h1 className='font-bold hidden sm:block text-2xl'>PetMind</h1>
                        <p>2024 Copyright</p>
                    </div>
                </div>
            </div>

            <div className='flex sm:gap-x-10 gap-x-3 items-center'>
                {navLinks && navLinks.map(item => <Link href={item.href} className='text-xs underline' key={item.title}>
                    {item.title}
                </Link>)}
            </div>
        </div>
    )
}

export default Footer