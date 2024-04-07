import React from 'react'

interface Booking {
  name: string;
  location: string;
  image: string;
}

interface BookingsViewProps {
  bookings: Booking[];
}

const BookingsView: React.FC<BookingsViewProps> = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return <div>No bookings available</div>;
  }

  return (
    <div className="bookings">
      <h1 className="text-5xl text-center font-bold mb-10">Bookings</h1>
      {bookings.map((booking, index) => (
        <div key={index} className="booking flex flex-row items-center gap-x-5 w-full justify-start p-5 rounded bg-primary">
          <img src={booking.image} alt={booking.name} width={150} height={150} />
          <div className="text-left flex flex-col gap-y-3 w-full">
            <h1 className="text-1xl font-bold">{booking.name}</h1>
            <p>{booking.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsView;
