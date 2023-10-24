import { FC, useEffect, useMemo, useRef, useState } from "react";
import cntl from "cntl";

import { Star } from "./star";

const classes = {
  title: cntl`  
    font-bold
    text-xl
    text-center
    mb-4 text-black
  `,
  starContainer: cntl`
  flex items-center justify-center
  py-2
  `,
};

type Props = {
  readonly static?: boolean;
  readonly classify?: boolean;
  readonly className?: string;
  readonly starClassName?: string;
  readonly totalStars: number;
  readonly initialRating: number;
  readonly handleRatingChange?: (rating: number) => void;
};

export const Rating: FC<Props> = (props) => {
  const ratingRef = useRef<HTMLDivElement>(null);
  const [tempRating, setTempRating] = useState(0);

  const [rating, setRating] = useState(props.initialRating);

  useEffect(() => {
    setRating(props.initialRating);
  }, [props.initialRating]);

  useEffect(() => {
    if (props.static) {
      return;
    }

    const stars =
      ratingRef.current?.querySelectorAll<HTMLDivElement>(".udemy-star");
    console.log("all stars", stars, ratingRef.current);
    if (!stars || stars.length === 0) {
      return;
    }

    stars.forEach((star, idx) => {
      const pos = idx + 1;

      star.addEventListener("mousemove", (e) => {
        const node = e.target as HTMLElement;
        if (!node) {
          return;
        }

        const { left, width } = node.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const ratio = mouseX / width;

        const nextRating = pos - (ratio < 0.5 ? 0.5 : 0);
        setTempRating(nextRating);
      });

      star.addEventListener("mouseleave", () => {
        setTempRating(0);
      });
    });
  }, [props.static]);

  const ratingClassification: Record<number, string> = useMemo(
    () => ({
      1: "Awful, not what I expected at all",
      2: "Poor, pretty disappointed",
      3: "Average, could be better",
      4: "Good, what I expected",
      5: "Amazing, above expectations!",
    }),
    [],
  );

  const onStarClick = (): void => {
    if (tempRating === rating) {
      setTempRating(0);
      setRating(0);
      props.handleRatingChange?.(0);

      return;
    }

    setRating(tempRating);
    props.handleRatingChange?.(tempRating);
  };

  const computedRating = tempRating > 0 ? tempRating : rating;
  const classificationRating =
    (computedRating * Object.keys(ratingClassification).length) /
    props.totalStars;

  return (
    <div>
      {props.classify ? (
        <span className={classes.title}>
          {ratingClassification[Math.ceil(classificationRating)] ||
            "Select Rating"}
        </span>
      ) : null}
      <div ref={ratingRef} className={classes.starContainer}>
        {[...Array(props.totalStars).keys()].map((index) => {
          if (computedRating >= index + 1) {
            return (
              <Star
                variant="full"
                key={index.toString()}
                className={props.starClassName}
                onClick={onStarClick}
              />
            );
          }

          if (computedRating > index) {
            return (
              <Star
                variant="half"
                key={index.toString()}
                className={props.starClassName}
                onClick={onStarClick}
              />
            );
          }

          return (
            <Star
              key={index.toString()}
              className={props.starClassName}
              onClick={onStarClick}
            />
          );
        })}
      </div>
    </div>
  );
};
