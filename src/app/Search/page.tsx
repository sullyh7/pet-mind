'use client'
import React from "react";

const SearchPage: React.FC = () => {
  // Placeholder data
  const minders = [
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
      rating: 4.3,
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
      rating: 4.9,
      image: "https://i.pravatar.cc/150?img=36",
    },
    {
      name: "Michael Chen",
      location: "Hong Kong, China",
      bio: "I love playing piano",
      rating: 4.6,
      image: "https://i.pravatar.cc/150?img=57",
    },
  ];
  const [minderList, setMinderList] = React.useState<{name: string, location: string, bio: string, rating: number, image: string}[] | undefined>(minders);
  const [searchText, setSearchText] = React.useState<string>("");

  const handleSearch = () => {
    if (!searchText) {
      setMinderList(minders);
      return;
    }
    else{
      const filteredList = 
        minders && minders?.length > 0
          ? minders.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()))
          : undefined;
      setMinderList(filteredList);
    }
  }

  return (
    <div className="m-5">
      {/*title*/}
      <h1 className="text-5xl text-center font-bold mb-10">Search For Minders</h1>
      {/*search*/}
      <div className="search flex flex-row gap-x-2 w-full items-center justify-center">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchText} 
          onChange={e => {
            setSearchText(e.target.value); 
            setMinderList(minders);}
          } 
          className="text-1xl text-left font-bold mb-10 p-3 rounded w-full border-2 border-primary"
        />
        <button onClick={handleSearch} className="bg-primary text-1xl text-center font-bold p-4 rounded hover:bg-secondary mb-10 w-50">Search</button>
        <button className="bg-primary text-1xl text-center font-bold mb-10 p-4 rounded hover:bg-secondary">Filter</button>
      </div>
      {/*results*/}
      <div className="results grid grid-cols-1 md:grid-cols-2 gap-5">
        {minderList?.length === 0 && <h1 className="text-1xl text-center font-bold mb-10 p-4 rounded">No results found</h1>}
        {minderList?.length > 0 && minderList?.map(user => {
          return (
            <div className="flex flex-row items-center gap-x-5 w-full justify-start p-5 rounded bg-primary" key={user.name}>
              <img src={user.image} alt={user.name} width={150} height={150} />
              <div className="text-left flex flex-col gap-y-3 w-full">
                <h1 className="text-1xl font-bold">{user.name}</h1>
                <p>{user.location}</p>
                <p>Description: {user.bio}</p>
                <p>Rating: {user.rating}</p>  
              </div>
            </div>
          )})
        }
      </div>
    </div>
  );
};

export default SearchPage;