import React from "react";
import { keyframes } from "@emotion/react";

const LoadingSpinner = () => {

    const spin = keyframes`
        from {
        transform: rotate(0deg);
        }
        to {
        transform: rotate(360deg);
        }
    `;

  return (
    <div className="spinner-container">
      <div className="loading-spinner" sx={{
        width: '50px',
        height: '50px',
        border: '10px solid #f3f3f3',
        borderTop: '10px solid #383636',
        borderRadius: '50%',
        animation: `${spin} 1.5s linear infinite`
      }}></div>
    </div>
  );
}

export default LoadingSpinner