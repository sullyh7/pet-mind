import WhyUsCard from "@/components/WhyUsCard";
import Hero from "@/components/ui/Hero";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon, Smile, SmileIcon, Users } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex gap-y-[15rem] flex-col items-center w-full justify-between ">
      <Hero/>
      <div className="w-full flex flex-col gap-y-10">
        <h1 className="text-5xl text-center font-bold">Why Us?</h1>
        <div className="flex flex-col md:flex-row items-center gap-y-5 justify-between">
          <WhyUsCard icon={SmileIcon}>We Strive to bring the best care to your pet.</WhyUsCard>
          <WhyUsCard icon={MessageCircleIcon}>Live messaging means you always have peace of mind.</WhyUsCard>
          <WhyUsCard icon={Users}>Choose from our large selecition of pet carers avaiable.</WhyUsCard>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-y-10">
        <h1 className="text-5xl sm:text-5xl md:text-7xl text-center font-bold">Book a minder now and get peace of mind!</h1>
        <Button className="bg-[#db3066] text-primary text-xl hover:bg-[#db3066]" size={"xl"}>Get Started</Button>
      </div>
    </main>
  )
}
