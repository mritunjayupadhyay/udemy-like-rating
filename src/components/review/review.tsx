import cntl from "cntl";
import { FC } from "react";
import moment from "moment";

import { Rating } from "../rating/rating";

const classes = {
  contentContainer: cntl`
    flex flex-col gap-2.5
  `,
  reviewerName: cntl`
    text-black text-base font-bold
   `,
  review: cntl`
  text-black/75 text-base font-normal
  `,
  reviewedOn: cntl`
  text-black/75 text-base font-medium
  `,
  header: cntl`flex flex-col gap-x-1`,
  starContainer: cntl`flex`,
  usernameContainer: cntl`flex items-center gap-x-2.5`,
};

type Props = {
  readonly reviewerName?: string;
  readonly totalStar: number;
  readonly rating: number;
  readonly review?: string;
  readonly reviewedOn?: Date;
};

export const Review: FC<Props> = (props) => {
  const { reviewerName = "", rating, totalStar, review, reviewedOn } = props;

  const reviewedOnText = `Reviewed on  ${moment(reviewedOn).format(
    "DD MMMM YYYY",
  )}`;

  if (!rating) {
    return null;
  }

  return (
    <div className={classes.contentContainer}>
      <div className={classes.header}>
        <div className={classes.usernameContainer}>
          <p className={classes.reviewerName}>{reviewerName}</p>
          <div className={classes.starContainer}>
            <Rating
              starClassName="!cursor-default !w-4 !h-4"
              totalStars={totalStar}
              initialRating={rating}
              static
            />
          </div>
        </div>
        <p className={classes.reviewedOn}>{reviewedOnText}</p>
        <p className={classes.review}>{review}</p>
      </div>
    </div>
  );
};
