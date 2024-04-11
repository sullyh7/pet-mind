"use client"
import React from 'react'
import Image from 'next/image';
import { TimePicker } from '@/components/ui/time-picker';
import { Calendar } from '@/components/ui/calendar';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form, FormDescription } from '@/components/ui/form';
import { DayPickerProvider } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from "date-fns"
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TimePickerInput } from './ui/time-picker-input';
import { createClient } from '../../utils/supabase/client';
import { useToast } from './ui/use-toast';
import { reviewFormSchema } from '@/lib/form/review';
import { useRouter } from 'next/navigation';

const ReviewForm = ({minder_id, rating}: {minder_id: string, rating: number}) => {

    const client = createClient();
    const {toast} = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof reviewFormSchema>>({
        resolver: zodResolver(reviewFormSchema),
        defaultValues: {
            rating: 0,
            text: "",
        },
    })

    function onSubmit(values: z.infer<typeof reviewFormSchema>) {
      var save_err = false;
        console.log(values)
        client.from("reviews").insert({
            rating: values.rating,
            review_text: values.text,
            minder_id: minder_id,
        }).then(resp => {
          if (resp.error) {
            toast({
              title: "Error posting review",
              description: resp.error.message,
              variant: "destructive",
            })
            save_err = true;
            return;
          }
          toast({
            title: "Posted review",
          })
        })

        if (save_err) {
          return;
        }
        client.from("minder_profiles").update({
          rating: rating + values.rating
      }).eq("id", minder_id)
      .then(resp => {
        if (resp.error) {
          toast({
            title: "Error updating rating",
            description: resp.error.message,
            variant: "destructive",
          })
          return;
        }
        toast({
          title: "Succesfully updated rating",
          description: resp.data
        })
        router.refresh();
      })
      
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating (out of 5)</FormLabel>
                            <FormControl>
                                <Input type='number'  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Some information</FormLabel>
                            <FormControl>
                                <Input type='text'  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className='bg-[#DB3066] text-background' >Post</Button>
            </form>
        </Form>
    )
}

export default ReviewForm;