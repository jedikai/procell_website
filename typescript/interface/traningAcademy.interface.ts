import { trainingData } from "@/json/mock/trainingData.mock";

export interface CircularProgressProps {
  image: string;
  percentage: number;
}
export interface chekboxProps {
  onChangeHandler: any;
}

export interface showDataProps {
  showCheckNumber: any;
  dataLength: any;
  percentage: number;
}

export type AccordionEachRowTypes = {
  expanded: boolean | string;
  handleChange: any;
  index: number;
  data: (typeof trainingData)[0];
};
