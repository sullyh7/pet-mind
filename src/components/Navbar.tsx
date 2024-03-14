import { navLinks } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='w-full flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <Image src={"/logos/logo.png"} alt='Logo' width={90} height={10}/>
                <Link href={"/"} className='font-bold hidden sm:block text-2xl'>PetMind</Link>
            </div>
        </div>

        {/* Url links (desktop only) */}
        <div className='hidden md:flex lg:space-x-10'>
            {navLinks && navLinks.map(link => 
            <Link key={link.title} href={link.href} className={cn("", buttonVariants({variant: "ghost", size: "xs"}))}>
                {link.title}
            </Link>)}
        </div>

        <div className='flex gap-x-3 items-center'>
            <Link href={"/sign-in"} className={cn(buttonVariants({variant: "default"}))}>Sign Up</Link>
            <Link href={"/sign-in"} className={cn(buttonVariants({variant: "outline"}))}>Sign in</Link>
            {/* only on small screens */}
            <MenuIcon className='block sm:hidden border w-10 h-10 rounded-sm' strokeWidth={1}/>
        </div>
    </div>
  )
}

export default Navbar