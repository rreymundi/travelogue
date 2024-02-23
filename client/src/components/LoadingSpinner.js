import React from "react";
import { keyframes } from "@emotion/react";

const LoadingSpinner = () => {
  const myKeyframe = keyframes`
  0 %  { transform: translate(1px, 1px)   rotate(0deg)    },
  ...
  100% { transform: translate(1px, -2px)  rotate(-1deg);  }
`;

  return (
    <div
      className="spinner-container"
      sx={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        height: "350px",
      }}
    >
      <div
        className="loading-spinner"
        sx={{
          width: "50px",
          height: "50px",
          border: "10px solid #f3f3f3",
          borderTop: "10px solid #383636",
          borderRadius: "50%",
          animation: `${myKeyframe} 1.5s linear infinite`,
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
