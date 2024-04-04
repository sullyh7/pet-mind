'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minder } from '@/types';
import BookingsView from '../../components/BookingsView';

const SearchPage: React.FC = () => {
  const [minders, setMinders] = useState<Minder[]>([
    {
      name: "Jane Smith",
      location: "London, UK",
      bio: "I love cuddles and hiking",
      rating: 4.8,
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Bob Johnson",
      location: "New York, USA",
      bio: "I love playing video games",
      rating: 4.5,
      image: "https://i.pravatar.cc/150?img=33",
    },
    {
      name: "Alice Brown",
      location: "Sydney, Australia",
      bio: "I love reading books",
      rating: 4.7,
      image: "https://i.pravatar.cc/150?img=28",
    },
    {
      name: "Mark Davis",
      location: "Paris, France",
      bio: "I love spending time with my family",
      rating: 4.7,
      image: "https://i.pravatar.cc/150?img=59",
    },
    {
      name: "Emily Wilson",
      location: "Tokyo, Japan",
      bio: "I love going to the beach",
      rating: 4.2,
      image: "https://i.pravatar.cc/150?img=36",
    },
    {
      name: "Michael Chen",
      location: "London, UK",
      bio: "I love playing piano",
      rating: 4.6,
      image: "https://i.pravatar.cc/150?img=57",
    },
    {
      name: "Olivia Taylor",
      location: "San Francisco, USA",
      bio: "I love playing chess",
      rating: 3.2,
      image: "https://i.pravatar.cc/150?img=29",
    },
    {
      name: "David Kim",
      location: "Seoul, South Korea",
      bio: "I love going to the mountains",
      rating: 4.4,
      image: "https://i.pravatar.cc/150?img=14",
    },
    {
      name: "Sophia Nguyen",
      location: "Los Angeles, USA",
      bio: "I love playing guitar",
      rating: 3.9,
      image: "https://i.pravatar.cc/150?img=35",
    },
    {
      name: "Daniel Lee",
      location: "Seoul, South Korea",
      bio: "I love reading manga",
      rating: 3.9,
      image: "https://i.pravatar.cc/150?img=56",
    },
    {
      name: "Emma Davis",
      location: "Paris, France",
      bio: "I love spending time with my friends",
      rating: 4.4,
      image: "https://i.pravatar.cc/150?img=21",
    },
    {
      name: "John Smith",
      location: "London, UK",
      bio: "I love playing piano",
      rating: 4.1,
      image: "https://i.pravatar.cc/150?img=55",
    },
    {
      name: "Emily Johnson",
      location: "New York, USA",
      bio: "I love reading books",
      rating: 4.3,
      image: "https://i.pravatar.cc/150?img=27",
    },
    {
      name: "Michael Davis",
      location: "London, UK",
      bio: "I love spending time with my family",
      rating: 3.8,
      image: "https://i.pravatar.cc/150?img=58",
    },
  ]);

  const [minderList, setMinderList] = useState(minders);
    const [searchText, setSearchText] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const [isFiltering, setIsFiltering] = useState(false);
    const [bookings, setBookings] = useState<Minder[]>([]);

    const handleSearch = () => {
        let filteredList = minders;

        if (searchText) {
            filteredList = filteredList.filter(user =>
                user.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (isFiltering) {
            if (locationFilter) {
                filteredList = filteredList.filter(user =>
                    user.location.toLowerCase().includes(locationFilter.toLowerCase())
                );
            }

            if (ratingFilter !== null) {
                filteredList = filteredList.filter(user => user.rating >= ratingFilter);
            }
        }

        setMinderList(filteredList);
    };

    const handleBooking = (minder: Minder) => {
        setBookings(prevBookings => [...prevBookings, minder]);
    };

    return (
        <div className="m-5">
            <h1 className="text-5xl text-center font-bold mb-10">Search For Minders</h1>

            <div className="search flex flex-row gap-x-2 w-full items-center justify-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    className="text-1xl text-left font-bold mb-5 p-3 rounded w-full border-2 border-primary"
                />
                <button onClick={handleSearch} className="bg-primary text-1xl text-center font-bold p-4 rounded hover:bg-secondary mb-5 w-60">Search</button>
                <button
                    onClick={() => {
                        setIsFiltering(!isFiltering);
                        handleSearch();
                    }}
                    className="bg-primary text-1xl text-center font-bold p-4 rounded hover:bg-secondary mb-5 w-60"
                >
                    {isFiltering ? "Clear Filter" : "Filter"}
                </button>
            </div>

            {isFiltering && (
                <div className="filter flex flex-row gap-x-2 w-full items-center justify-center">
                    <input
                        type="text"
                        placeholder="Filter by Location..."
                        value={locationFilter}
                        onChange={e => setLocationFilter(e.target.value)}
                        className="text-1xl text-left font-bold mb-5 p-3 rounded w-full border-2 border-primary"
                    />
                    <p className="text-1xl text-left font-bold mb-5 p-3 rounded w-60 border-2 border-primary">Filter by Rating:</p>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={ratingFilter || 0}
                        onChange={e => setRatingFilter(parseFloat(e.target.value))}
                        className="w-auto border-2 border-primary align-center"
                    />
                    <span className="text-1xl text-center font-bold mb-5 p-3 rounded w-full md:w-20 border-2 border-primary">{ratingFilter}</span>
                </div>
            )}

            <div className="results grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                {minderList.length === 0 && (
                    <h1 className="text-1xl text-center font-bold mb-10 p-4 rounded col-span-2">No results found</h1>
                )}
                {minderList.length > 0 &&
                    minderList.map(user => {
                        return (
                            <div className="flex flex-row items-center gap-x-5 w-full justify-start p-5 rounded bg-primary" key={user.name}>
                                <img src={user.image} alt={user.name} width={150} height={150} />
                                <div className="text-left flex flex-col gap-y-3 w-full">
                                    <h1 className="text-1xl font-bold">{user.name}</h1>
                                    <p>{user.location}</p>
                                    <p>Description: {user.bio}</p>
                                    <p>Rating: {user.rating}</p>
                                    <Button onClick={() => handleBooking(user)}>Request Booking</Button>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <BookingsView bookings={bookings} />
        </div>
    );
};

export default SearchPage;