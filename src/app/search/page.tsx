'use client'
import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "../../../utils/supabase/client";
import Image from "next/image";

type Minder = {
  avatar_url: string | null;
  description: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  location: string | null;
  rating: number | null;
  updated_at: string | null;
}

const SearchPage: React.FC = () => {

  const client = createClient();
  useEffect(() => {
    client.from("minder_profiles").select("*")
    .then(resp => setMinderList(resp.data));
  }, [client])

  const [minderList, setMinderList] = useState<null | Minder[]>(null)
  const [searchText, setSearchText] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState("");
  const [ratingFilter, setRatingFilter] = React.useState<number | null>(null);
  const [isFiltering, setIsFiltering] = React.useState(false);

  const handleSearch = () => {
    let filteredList = minderList;
    if (filteredList == null) {
      return;
    }

    if (searchText) {
      filteredList = filteredList.filter(user =>
        user.first_name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (isFiltering) {
      if (locationFilter) {
        filteredList = filteredList.filter(user =>
          user.location?.toLowerCase().includes(locationFilter.toLowerCase())
        );
      }

      if (ratingFilter !== null) {
        filteredList = filteredList.filter(user => user.rating! >= ratingFilter);
      }
    }

    setMinderList(filteredList);
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
        {minderList && 
        <div className="results grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            {minderList.length === 0 && (
                <h1 className="text-1xl text-center font-bold mb-10 p-4 rounded col-span-2">No results found</h1>
            )}
            {minderList.length > 0 &&
                minderList.map(user => {
                    return (
                        <div className="flex flex-row items-center gap-x-5 w-full justify-start p-5 rounded bg-primary" key={user.id}>
                            {/* <Image src={user.avatar_url!} alt={user.first_name!} width={150} height={150} /> */}
                            <div className="text-left flex flex-col gap-y-3 w-full">
                                <h1 className="text-1xl font-bold">{user.first_name + " " + user.last_name}</h1>
                                <p>{user.location}</p>
                                <p>Description: {user.description}</p>
                                <p>Rating: {user.rating == 0 ? "No ratings" : user.rating}</p>
                                <Button 
                                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/60 h-9 rounded-md px-4 bg-[#db3066] text-background"
                                >
                                  Request Booking
                                </Button>
                            </div>
                        </div>
                    );
                })}
        </div>}
    </div>
);
};

export default SearchPage;