import cntl from "cntl";
import { FC } from "react";
import viteLogo from "/vite.svg";
import defaultStar from "/icon-star-default.svg";
import halfStar from "/icon-star-half.svg";
import fullStar from "/icon-star-filled.svg";

<a href="https://vitejs.dev" target="_blank">
  <img src={viteLogo} className="logo" alt="Vite logo" />
</a>;

const classes = {
  star: cntl`
    cursor-pointer udemy-star
  `,
  starImage: (className?: string) => cntl`
  ${className || ""}
  `,
};

type Props = {
  readonly variant?: "full" | "half";
  readonly className?: string;
  readonly onClick?: () => void;
};

export const Star: FC<Props> = (props) => {
  const getStarIcon = (): JSX.Element => {
    switch (props.variant) {
      case "full":
        return (
          <img
            className={classes.starImage(props.className)}
            src={fullStar}
            alt="Full Star"
          />
        );
      case "half":
        return (
          <img
            className={classes.starImage(props.className)}
            src={halfStar}
            alt="Half Star"
          />
        );
      default:
        return (
          <img
            className={classes.starImage(props.className)}
            src={defaultStar}
            alt="Default Star"
          />
        );
    }
  };

  return (
    <div className={classes.star} onClick={props.onClick}>
      {getStarIcon()}
    </div>
  );
};
