"use client"
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from './DataTable';
import Link from 'next/link';
import { CheckCircle, LucideMessageSquareText } from 'lucide-react';
import { Button } from './ui/button';

interface Booking {
  approved: boolean | null;
  date: string | null;
  duration: number | null;
  id: number;
  minder_id: string | null;
  owner_id: string | null;
  pet: string | null;
}

interface BookingsViewProps {
  bookings: Booking[] | null,
  owner: boolean
}

const BookingsView = ({bookings, owner}: BookingsViewProps) => {

  const columns: ColumnDef<Booking>[] = 
  !owner ? [
    {
      accessorKey: "approved",
      header: () => <div className="text-right">Approved</div>,
      cell: ({ row }) => {
        const val = parseFloat(row.getValue("approved"))
   
        return <div className="text-right font-medium">{val ? "Yes" : "Pending"}</div>
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const val: string = row.getValue("date")
        const date = new Date(val).toString()

   
        return <div className=" font-medium">{date}</div>
      },
    },
    {
      accessorKey: "duration",
      header: "Duration (hours)",
    },
    {
      accessorKey: "pet",
      header: "Pet",
    },
    {
      accessorKey: "id",
      header: "Chat with owner",
      cell: ({row}) => {
        const booking = row.getValue("id");
        return <Link href={"/chat/booking/" + booking}><LucideMessageSquareText/></Link>
      }
    },

    {
      accessorKey: "id",
      header: "Approve Booking",
      cell: ({row}) => {
        const booking = row.getValue("id");
        return <Button onClick={() => {}}><CheckCircle/></Button>
      }
    }
  ] : [
    {
      accessorKey: "approved",
      header: () => <div className="text-right">Approved</div>,
      cell: ({ row }) => {
        const val = parseFloat(row.getValue("approved"))
   
        return <div className="text-right font-medium">{val ? "Yes" : "Pending"}</div>
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const val: string = row.getValue("date")
        const date = new Date(val).toString()

   
        return <div className=" font-medium">{date}</div>
      },
    },
    {
      accessorKey: "duration",
      header: "Duration (hours)",
    },
    {
      accessorKey: "pet",
      header: "Pet",
    },
    {
      accessorKey: "id",
      header: "Chat with minder",
      cell: ({row}) => {
        const booking = row.getValue("id");
        return <Link href={"/chat/booking/" + booking}><LucideMessageSquareText/></Link>
      }
    },
  ]
  if (!bookings) {
    return <h1>No bookings.</h1>
  }
  if(bookings == undefined) {
    return <h1>Error loading bookings</h1>
  }
  return (
    <div>
      <DataTable columns={columns} data={bookings}/>
    </div>
  )
}

export default BookingsView