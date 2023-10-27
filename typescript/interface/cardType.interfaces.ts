export interface cardTypeProps {
  cardimg: string;
  cardImgWidth: number;
  cardImgHeight: number;
  isSelected?: boolean;
  click?: (data:string) => void;
}
