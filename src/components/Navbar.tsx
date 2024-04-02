import { navLinks } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { LucideArrowRight, MenuIcon } from 'lucide-react'
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from './ui/sheet'


const Navbar = async () => {
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
                <Link href={"/sign-in"} className={cn(buttonVariants({ variant: "default" }))}>Sign Up</Link>
                <Link href={"/sign-in"} className={cn(buttonVariants({ variant: "outline" }))}>Sign in</Link>
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