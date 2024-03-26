export interface CategoryCardProps {
  imgUrl: string;
  imgWidth?: number;
  imgHeight?: number;
  content: string;
  url: string;
}

export interface CategorySliderProps {
  categorySlider: CategoryCardProps[];
}
