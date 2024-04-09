"use client"
import React from 'react'
import Image from 'next/image';
import { TimePicker } from '@/components/ui/time-picker';
import { Calendar } from '@/components/ui/calendar';
import { bookFormSchema } from '@/lib/form/book';
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

const BookForm = ({minder_id}: {minder_id: string}) => {

    const client = createClient();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof bookFormSchema>>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: {
            duration: 0,
            date: new Date(),
            pet: ""
        },
    })

    function onSubmit(values: z.infer<typeof bookFormSchema>) {
        console.log(values)
        client.from("bookings").insert({
            date: values.date.toISOString(),
            duration: values.duration,
            pet: values.pet,
            minder_id: minder_id,
             
        }).then((d) => {
            if (d.error) {
                toast({
                    title: "Error booking",
                    description: d.error.message,
                    variant: "destructive"
                })
                return;
            }
        })
        toast({
            title: "Booking made succesfully",
            description: "You can view your bookings in your dashboard"
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Pick a date.</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />

                                    <div className="p-3 border-t border-border">
                                        <TimePicker setDate={field.onChange} date={field.value} />
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input type='number'  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pet"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pet</FormLabel>
                            <FormControl>
                                <Input type='text'  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className='bg-[#DB3066] text-background' >Sign up</Button>
            </form>
        </Form>
    )
}

export default BookForm;