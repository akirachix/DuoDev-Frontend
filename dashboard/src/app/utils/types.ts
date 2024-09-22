// Order List type
export  interface OrderData {
        id:number;
        location:string;
        phone_number:string | null;
        product: number;
        status: string;
        order_number:string;
        total_price:string
      }
// Product List type
      export interface ProductData{
          product_id: number;
          product_name: string;
          price: string;
          material: string;
          description: string;
          image: string | null;
          trader: number | null;
        }