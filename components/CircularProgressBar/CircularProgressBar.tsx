/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-extraneous-dependencies */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
// eslint-disable-next-line mui-path-imports/mui-path-imports
import { Box } from "@mui/material";
import Image from "next/image";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
interface props {
  image: string;
  value: number;
}

const CircularWrapper = styled(Box)`
  .svg-circle-text {
    font-size: 0.5rem;
    text-anchor: middle;
    fill: ${primaryColors.black};
    font-weight: bold;
  }

  .circular-chart {
    display: block;
    margin: 10px auto;
    max-width: 80%;
    max-height: 250px;
  }

  .circle {
    stroke: #99da98;
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
  }

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
  .CircularProgressbar + div {
    z-index: -1;
    padding: 30px;
  }
  &.circular_wrap {
    width: 120px;
    height: 120px;
    position: relative;
    z-index: 1;
    @media (max-width: 899px) {
      min-width: 100px;
      width: 100px;
      height: 100px;
    }
  }
  .CircularProgressbar .CircularProgressbar-trail {
    stroke: #e9f4fa;
    /* stroke-linecap: round; */
  }
`;

export default function CircularProgressBar({ image, value }: props) {
  return (
    <CircularWrapper className="circular_wrap">
      <CircularProgressbarWithChildren value={value} strokeWidth={8}>
        <Image
          style={{ maxHeight: 98, marginTop: -5 }}
          src={image}
          alt=""
          width={90}
          height={90}
        />
        {/* <div style={{ fontSize: 12, marginTop: -5 }}>
          <strong>66%</strong> mate
        </div> */}
      </CircularProgressbarWithChildren>
    </CircularWrapper>
  );
}
