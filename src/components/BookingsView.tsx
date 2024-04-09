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
  }[] | null
}





const BookingsView = ({bookings}: BookingsViewProps) => {
  if (!bookings) {
    return <h1>No bookings.</h1>
  }
  return (
    <div>{bookings[0].date}</div>
  )
}

export default BookingsView