import { useState } from "react";
import "./App.css";
import cntl from "cntl";
import { UdemyLikeReviewForm } from "./components/review/udemy-like-rating-form";
import { Review } from "./components/review/review";
import { TOTAL_STAR } from "./constant";

const classes = {
  reviewContainer: cntl`
    p-4 max-w-[600px] m-auto
  `,
  reviewTitle: cntl`
  font-bold
  text-2xl
  text-center
  mb-3 text-black mt-10
  `,
};

export interface IReview {
  rating: number;
  review?: string;
  reviewedOn?: Date;
  reviewerName?: string;
}

function App() {
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const initialReview: IReview = {
    rating: 0,
  };
  const [review, setReview] = useState(initialReview);
  const handleReviewSubmit = (data: IReview) => {
    setReview({
      ...data,
    });
  };
  return (
    <div className="p-5 min-h-screen bg-white w-full">
      <div className="p-1">
        {review.rating === 0 ? (
          <button className="m-auto" onClick={() => setOpenReviewForm(true)}>
            {`Add your review`}
          </button>
        ) : (
          <div className={classes.reviewContainer}>
            <h3 className={classes.reviewTitle}> Reviews</h3>
            <Review
              reviewerName={review.reviewerName}
              totalStar={TOTAL_STAR}
              rating={review.rating}
              review={review.review}
              reviewedOn={review.reviewedOn}
            />
          </div>
        )}
      </div>
      <UdemyLikeReviewForm
        handleReviewSubmit={handleReviewSubmit}
        isOpen={openReviewForm}
        onClose={() => setOpenReviewForm(false)}
      />
    </div>
  );
}

export default App;
