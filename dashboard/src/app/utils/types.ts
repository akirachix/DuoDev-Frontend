// Order List type
export interface OrderData {
  id: number;
  location: string;
  phone_number: string | null;
  product: number;
  status: string;
  order_number: string;
  total_price: string;
}

// Product List type
export interface ProductData {
  product_id: number;
  product_name: string;
  price: string;
  material: string;
  description: string;
  image: string | null;
  trader: number | null;
}

// Textile Bale List type
export interface TextileBaleData {
  bale_id: number;
  waste_type: string;
  weight: number;
  price: string;
  image: string;
  phone_number: string ;
  upload_date: string;
  is_verified: boolean;
  trader: number | null;
  posted_by: number;
  location: string;
}
// orders types
export  interface OrderData {
        id:number;
        location:string;
        phone_number:string | null;
        product: number;
        status: string;
        order_number:string;
        total_price:string
      }

// textile bale types
