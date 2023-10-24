import { ChangeEvent, FC, useState } from "react";
import { Modal } from "../modal";
import { Rating } from "../rating/rating";
import { TOTAL_STAR, reviewTitle, ratingTitle, username } from "../../constant";
import cntl from "cntl";
import { IReview } from "../../App";

const classes = {
  backButton: cntl`
  absolute top-6 left-6 text-sm
  bg-transparent p-0 border-0 cursor-pointer
  text-blue outline-0 hover:border-0 active:border-0
  hover:outline-0 active:outline-0 font-bold
  `,
  title: cntl`  
  font-bold
  text-2xl
  text-center
  mb-6 text-black mt-10
`,
  textArea: cntl`  
    font-medium
    text-base
    mb-4 text-black
    border border-black resize-none rounded-none
    px-4 py-3 bg-white
    placeholder:italic placeholder:text-black/50
    w-full outline-0
  `,
  footer: cntl`
     p-4 text-right
     absolute shadow-footer z-[100] bottom-0 left-0 right-0
    sm: sm: sm: sm: sm: sm:
    sm:relative sm:shadow-none
  `,
  submit: cntl`
  bg-black h-12 
  text-white font-bold px-3
  outline-0 border-0 rounded-none
  `,
};

export interface IProps {
  readonly isOpen?: boolean;
  readonly onClose: () => void;
  readonly handleReviewSubmit: (data: IReview) => void;
}

export const UdemyLikeReviewForm: FC<IProps> = ({
  isOpen,
  onClose,
  handleReviewSubmit,
}) => {
  const [openReviewBox, setOpenReviewBox] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setReviewText(newValue);
  };

  const handleRatingChange = (r: number) => {
    setRating(r);
    setOpenReviewBox(true);
  };

  const handleSubmit = () => {
    handleReviewSubmit({
      rating,
      review: reviewText,
      reviewedOn: new Date(),
      reviewerName: username,
    });
    onClose();
  };

  return isOpen ? (
    <Modal isOpen={isOpen} onClose={onClose}>
      {openReviewBox ? (
        <button
          onClick={() => setOpenReviewBox(false)}
          className={classes.backButton}
        >
          Back
        </button>
      ) : null}
      <div className={classes.title}>
        {openReviewBox ? reviewTitle : ratingTitle}
      </div>
      <Rating
        totalStars={TOTAL_STAR}
        initialRating={rating}
        classify
        handleRatingChange={handleRatingChange}
        starClassName="w-12"
      />
      {openReviewBox ? (
        <div className="mt-6">
          <textarea
            className={classes.textArea}
            onChange={handleChange}
            value={reviewText}
            rows={5}
            placeholder="Tell us about your own personal experience taking this course. Was it a good match for you?"
          />
        </div>
      ) : null}
      {openReviewBox ? (
        <div className={classes.footer}>
          <button onClick={handleSubmit} className={classes.submit}>
            Save and Continue
          </button>
        </div>
      ) : null}
    </Modal>
  ) : null;
};
