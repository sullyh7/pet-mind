"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUpFormSchema } from '@/lib/form/signup'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createClient } from '../../../utils/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { signInFormSchema } from '@/lib/form/signin';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const supabase = createClient();
  const { toast } = useToast();
  const router = useRouter();


  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
    }).then((d) => {
      if (d.error) {
        toast({
          title: "There was an error signing in.",
          description: d.error.message,
          variant:"destructive"
      })
      return;
      }
        toast({
            title: "Signing in...",
            description: d.data.user ? "Successful" : "Try again",
            variant: d.data.user ? "default" : "destructive"
        })
    }).catch(() => {
        toast({
            title: "Error signing in.",
            variant: "destructive"
        })
    })
    form.reset();
    router.refresh()
    router.push("/")
    console.log(values)
  }

  return (
    <div className='flex items-center justify-center flex-col gap-y-10'>
      <h1 className='text-center sm:text-5xl text-3xl font-bold'>Welcome back.</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit" className='bg-[#DB3066] text-background' >Sign in</Button>
        </form>
      </Form>
    </div>
  )
}

export default SignIn