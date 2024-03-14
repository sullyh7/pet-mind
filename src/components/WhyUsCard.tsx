import { LucideIcon } from 'lucide-react'
import React from 'react'

interface WhyUsCardProps {
    children: React.ReactNode,
    icon: LucideIcon
}

const WhyUsCard = ({children, icon: Icon}: WhyUsCardProps) => {
  return (
    <div className='bg-primary p-10 rounded-md items-center text-center flex flex-col gap-y-2 max-w-[15rem]'>
        <Icon className='' size={100} strokeWidth={1.3}/>
        <h1 className='leading-[1.2rem] '>{children}</h1>
    </div>
  )
}

export default WhyUsCard