import { ChangeEvent, FC, useCallback, useState } from "react";
import { Modal } from "../modal";
import { Rating } from "./rating";
import { TOTAL_STAR, reviewTitle } from "../../constant";
import cntl from "cntl";

const classes = {
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
    absolute bottom-0 left-0 right-0
    shadow-footer z-[100] p-4 text-right
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
  readonly handleReviewSubmit: (data: unknown) => void;
}

export const UdemyLikeReviewForm: FC<IProps> = ({ isOpen, onClose }) => {
  const [openReviewBox, setOpenReviewBox] = useState(true);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    setReviewText(newValue);
  }, []);

  return isOpen ? (
    <Modal
      isOpen={isOpen}
      title={reviewTitle}
      onClose={onClose}
      onBack={() => setOpenReviewBox(false)}
    >
      <Rating
        totalStars={TOTAL_STAR}
        initialRating={rating}
        classify
        handleRatingChange={(r) => setRating(r)}
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
      <div className={classes.footer}>
        <button className={classes.submit}>Save and Continue</button>
      </div>
    </Modal>
  ) : null;
};
