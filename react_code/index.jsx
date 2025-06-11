import React from "react";
import frame from "./frame.png";
import image from "./image.png";
import "./style.css";

export const Frame = () => {
  return (
    <div className="frame">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <img className="img" alt="Frame" src={frame} />

          <img className="img-2" alt="Frame" src={image} />
        </div>
      </div>
    </div>
  );
};
