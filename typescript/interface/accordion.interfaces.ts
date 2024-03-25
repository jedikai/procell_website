/* eslint-disable mui-path-imports/mui-path-imports */
import { AccordionProps } from "@mui/material";

export interface accorProps extends AccordionProps {
  indexNumber: string | any;
  expand: any;
  handleClick: any;
  accordianHead: JSX.Element | JSX.Element[] | string;
  children: JSX.Element | JSX.Element[];
  show?: boolean;
}
