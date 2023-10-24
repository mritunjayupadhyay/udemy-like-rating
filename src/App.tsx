import { useState } from "react";
import "./App.css";
import { UdemyLikeReviewForm } from "./components/rating/udemy-like-rating-form";

function App() {
  const [openReviewForm, setOpenReviewForm] = useState(true);
  const handleReviewSubmit = (data: unknown) => {
    console.log("this is data", data);
  };
  return (
    <div className="p-5">
      <div className="p-1">
        <button onClick={() => setOpenReviewForm(true)}>
          Open review form
        </button>
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
