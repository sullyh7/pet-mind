import React from 'react'

interface BookingsViewProps {
  bookings: {
    approved: boolean | null;
    date: string | null;
    duration: number | null;
    id: number;
    minder_id: string | null;
    owner_id: string | null;
    pet: string | null;
  }[]
}





const BookingsView = ({bookings}: BookingsViewProps) => {
  return (
    <div>{bookings[0].date}</div>
  )
}

export default BookingsView