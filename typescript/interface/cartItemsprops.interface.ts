export interface cardItems {
  image: string;
  product_name: string;
  itemCount: number;
}
export interface cardItemsApiResponse {
  id: number;
  product_id: [number, string];
  product_image_url: string;
  name_short: string;
  product_uom_qty: number;
  price_reduce_taxexcl: number;
}

export interface cardItemsProps {
  itemsList: cardItems[];
  updateBilling?: any;
}
