import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Cookies from 'js-cookie';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../app/globals.css";

const REVIEWS_STORAGE_KEY = 'userReviews';

interface Review {
  id: number;
  name: string;
  minderName: string;
  content: string;
  rating: number;
}

const ReviewForm: React.FC<{ onAddReview: (newReview: Omit<Review, 'id'>) => void }> = ({ onAddReview }) => {
  const [name, setName] = useState<string>('');
  const [minderName, setMinderName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(5);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddReview({ name, minderName, content, rating });
    setName('');
    setMinderName('');
    setContent('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="text"
        placeholder="Pet Minder's Name"
        value={minderName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMinderName(e.target.value)}
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
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setRating(parseInt(e.target.value, 10))}
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
          <p>Pet Minder's Name: {review.minderName}</p>
          <p>{review.content}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
};

const ClearReviewsButton: React.FC<{ onClearReviews: () => void }> = ({ onClearReviews }) => {
  return (
    <button onClick={onClearReviews} className="bg-[#db3066] text-white p-2 rounded">
      Clear Reviews
    </button>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const storedReviewsJson = Cookies.get(REVIEWS_STORAGE_KEY);
    if (storedReviewsJson) {
      try {
        const storedReviews = JSON.parse(storedReviewsJson);
        setReviews(storedReviews);
      } catch (error) {
        console.error("Failed to parse reviews from cookies.", error);
      }
    }
  }, []);

  const handleAddReview = (newReview: Omit<Review, 'id'>) => {
    const newId = reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1;
    const updatedReviews = [...reviews, { ...newReview, id: newId }];
    setReviews(updatedReviews);
    Cookies.set(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews), { expires: 365 });
  };

  const handleClearReviews = () => {
    Cookies.remove(REVIEWS_STORAGE_KEY);
    setReviews([]); // Clear reviews from state, immediately updating the UI
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>
        <ReviewForm onAddReview={handleAddReview} />
        <ReviewList reviews={reviews} />
        <ClearReviewsButton onClearReviews={handleClearReviews} />
      </div>
      <Footer />
    </>
  );
}


