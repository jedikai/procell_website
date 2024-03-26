import React, { memo } from "react";

const ButtonLoader = ({ customClass }: any) => {
  return (
    <div className="snippet" data-title="dot-pulse">
      <div className="stage">
        <div className={`dot-pulse ${customClass ? customClass : ""}`}></div>
      </div>
    </div>
  );
};

export default memo(ButtonLoader);
