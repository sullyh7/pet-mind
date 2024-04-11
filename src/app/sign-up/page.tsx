"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpFormSchema } from '@/lib/form/signup'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createClient } from '../../../utils/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { AuthResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const supabase = createClient();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    console.log("Signing up!");
    supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          type: "owner"
        },
        emailRedirectTo: window.location.origin + "/login"
      }
    }).then((resp: AuthResponse) => {
      if (resp.error) {
        toast({
          title: "Error signing up!",
          description: resp.error.message + " " + resp.error.cause,
          variant: "destructive",
        })
        console.log("Error stack:"  +resp.error.stack)
        return;
      }


      toast({
        title: "Signed up.",

      })
      router.push("/")
    }).catch((e: any) => {
      toast({
        title: "Error signing up.",
        description: e.toString(),
        variant: "destructive",
      })
    })
    form.reset();
    console.log(values)
  }

  return (
    <div className='flex items-center justify-center flex-col gap-y-10'>
      <h1 className='text-center sm:text-5xl text-3xl font-bold'>We just need some more information...</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hassan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="John@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='bg-[#DB3066] text-background' >Sign up</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignUp