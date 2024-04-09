"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { becomeAMinderFormSchema} from '@/lib/form/signup'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createClient } from '../../../utils/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { AuthResponse } from '@supabase/supabase-js';

const BecomeAMinder = () => {
  const supabase = createClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof becomeAMinderFormSchema>>({
    resolver: zodResolver(becomeAMinderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      location: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof becomeAMinderFormSchema>) {
    console.log("Signing up!");
    console.log(values);
    supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          location: values.location,
          type: "minder",
          avatarUrl: "./logos/logo.png",
          rating:0,
          desc: values.description,
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
        console.log(resp.error.stack);
        console.log(resp.error.name)
        return;
      }

      toast({
        title: "Signed up.",
        
      })
    }).catch((e: any) => {
      toast({
        title: "Error signing up.",
        description: e.toString(),
        variant: "destructive",
      })
    })
    // form.reset();
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>A bit about you:</FormLabel>
                <FormControl>
                  <Input type='text' placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input type='text' placeholder="John" {...field} />
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

export default BecomeAMinder;