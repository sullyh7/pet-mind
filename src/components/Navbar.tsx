"use client";

import { navLinks } from '../lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { cn } from '../lib/utils'
import { LucideArrowRight, MenuIcon } from 'lucide-react'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from './ui/sheet'
import { User } from '@supabase/supabase-js'
import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';


const Navbar = () => {
    const client = createClient();
    const router = useRouter();

    const [user, setUser] = useState<User | null>();
    
    useEffect(() => {
        client.auth.onAuthStateChange((_, b) => {
            console.log(b?.user.email);
            setUser(b?.user)
        }) 
        client.auth.getUser()
        .then((u) => {setUser(u.data.user)})
    }, [client.auth])

    return (
        <div className='w-full flex items-center justify-between'>
            {/* Logo */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <Image src={"/logos/logo.png"} alt='Logo' width={90} height={10} />
                    <Link href={"/"} className='font-bold hidden lg:block text-2xl'>PetMind</Link>
                </div>
            </div>

            {/* Url links (desktop only) */}
            <div className='hidden md:flex lg:gap-x-10 sm:gap-x-2'>
                {navLinks && navLinks.map(link =>
                    <Link key={link.title} href={link.href} className={cn("", buttonVariants({ variant: "ghost", size: "xs" }))}>
                        {link.title}
                    </Link>)}
            </div>

            <div className='flex gap-x-3 items-center'>
                {!user && <Link href={"/sign-up"} className={cn(buttonVariants({ variant: "default" }))}>Sign Up</Link>}
                {!user && <Link href={"/sign-in"} className={cn(buttonVariants({ variant: "outline" }))}>Sign in</Link>}
                {user && <Link href={user.user_metadata.type == "owner" ?  "/dashboard/owner" : "/dashboard/minder"} className={cn(" text-background bg-[#DB3066]", buttonVariants({ variant: "ghost" }))}>Dashboard</Link>}
                {user && <Button onClick={async () => {await client.auth.signOut(); router.refresh(); router.push("/sign-in")}}>Sign Out</Button>}
                {/* only on small screens */}
                <div className='items-center sm:hidden flex'>
                <Sheet>
                    <SheetTrigger><MenuIcon className=' border w-10 h-10 rounded-sm' strokeWidth={1} /></SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                        <SheetHeader>
                            <SheetTitle className='text-center'>Navigation</SheetTitle>
                            {navLinks.map(link => <Link className={buttonVariants({variant: "default"})} key={link.title} href={link.href}>
                                {link.title}
                            </Link>)}
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                </div>
                
            </div>
        </div>
    )
}

export default Navbar