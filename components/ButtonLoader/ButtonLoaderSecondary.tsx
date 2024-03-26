import React, { memo } from "react";

const ButtonLoaderSecondary = ({ customClass }: any) => {
  return (
    <div className="snippet_secondary" data-title="dot-pulse_secondary">
      <div className="stage_secondary">
        <div className={`dot-pulse_secondary ${customClass ? customClass : ""}`}></div>
      </div>
    </div>
  );
};

export default memo(ButtonLoaderSecondary);
