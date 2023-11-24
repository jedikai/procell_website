export type topicList = {
  name: string;
  link: string;
};
export interface topicProps {
  title: string;
  topicData: topicList[];
  getCategoriesWiseBlog?: any;
  selectedCategoriesId?: any;
}
