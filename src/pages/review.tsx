import { useState, ChangeEvent, FormEvent } from 'react';
import "../app/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from 'react'


interface Review {
  id: number;
  name: string;
  content: string;
  rating: number;
}

const ReviewForm: React.FC<{ onAddReview: (newReview: Omit<Review, 'id'>) => void }> = ({ onAddReview }) => {
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(5);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddReview({ name, content, rating });
    setName('');
    setContent('');
    setRating(5);
  };

  return (

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Pet Minder"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        className="border p-2"
        required
      />
      <textarea
        placeholder="Your Review"
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        className="border p-2"
        required
      />
      <select
        value={rating}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setRating(parseInt(e.target.value))}
        className="border p-2"
        required
      >
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Very Good</option>
        <option value="3">3 - Average</option>
        <option value="2">2 - Poor</option>
        <option value="1">1 - Terrible</option>
      </select>
      <button type="submit" className="bg-[#db3066] text-white p-2">Submit Review</button>

    </form>
  );
};

const ReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 pb-40">
      {reviews.map(review => (
        <div key={review.id} className="border p-4 my-2">
          <h3 className="font-bold">{review.name}</h3>
          <p>{review.content}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleAddReview = (newReview: Omit<Review, 'id'>) => {
    const newId = reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1;
    setReviews([...reviews, { ...newReview, id: newId }]);
  };

  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>
      <ReviewForm onAddReview={handleAddReview} />
      <ReviewList reviews={reviews} />
    </div>
    <Footer/>
    </>
  );
}
