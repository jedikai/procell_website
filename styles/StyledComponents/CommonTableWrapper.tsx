/* eslint-disable mui-path-imports/mui-path-imports */
import { primaryColors } from "@/themes/_muiPalette";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const CommonTableWrapper = styled(Box)`
  .commontableSection {
    table {
      white-space: nowrap;
    }
    thead {
      tr {
        th {
          padding: 27px 10px;
          border-bottom: none;

          p {
            color: ${primaryColors.black};
            font-size: 15px;
            font-weight: 500;
            line-height: 1.3;
            text-transform: capitalize;
            padding: 0 10px;
          }
        }
      }
    }
    tbody {
      tr {
        &:nth-child(odd) {
          background: rgba(217, 217, 217, 0.13);
        }
        td {
          padding: 21px 10px;
          border-bottom: none;
          p {
            font-size: 14px;
            line-height: 1.6;
            padding: 0 10px;
          }
          :last-child {
            p {
              color: ${primaryColors.tablered};
              font-size: 14px;
              font-weight: 400;
              line-height: 1.6;
              padding: 0 10px;
            }
            .expired {
              color: ${primaryColors.tableyellow};
            }
            .accepted,
            .delivered {
              color: ${primaryColors.tablegreen};
            }
          }
        }
      }
    }
  }
`;
