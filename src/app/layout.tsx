import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { createClient } from "../../utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetMind",
  description: "Pet minder application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = createClient();
  const user = await supabase.auth.getUser()
  return (
    <html lang="en">

      <body className={inter.className}>
        <div className="text-[#331D42] flex flex-col gap-y-[6rem] mx-auto w-full max-w-screen-xl p-2.5 md:px-20 bg-background">
          <Navbar user={user.data.user}/>
          <div className="px-5 min-h-screen ">
          {children}
          </div>
          <Footer/>
        </div>
        <Toaster/>
      </body>


    </html>
  );
}
