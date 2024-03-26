import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

export const CategoryCardWrapper = styled(Box)`
  &.category_card {
    .cat_inner_main {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      background-color: ${primaryColors.white};
      transition: all 0.3s ease-in-out 0s;
      border-radius: 10px;
      border: 1px solid ${primaryColors.color30A6E2};
      padding: 30px 30px 25px 30px;
      &.active_card {
        background: linear-gradient(143deg, #2fa6e2 1.31%, #50419c 113.15%);
        .category_name {
          color: ${primaryColors.white};
        }
      }
      &:hover {
        background: linear-gradient(143deg, #2fa6e2 1.31%, #50419c 113.15%);
        .category_name {
          color: ${primaryColors.white};
        }
      }
      .category_image {
        width: 100%;
        height: 101px;
        margin: 0 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center;
        }
      }
      .category_name {
        color: ${primaryColors.black};
        font-weight: 500;
        font-size: 15px;
      }
    }
  }
`;
