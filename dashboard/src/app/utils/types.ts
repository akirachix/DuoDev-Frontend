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
        order_number:string;
        total_price:string;
      }

      export interface AgentsData {
        agent_id: number;
        agent_name: string;
        email: string;
        password: string;
        phone_number: string;
        role: string;
        location: string;
        created_at: string;
        updated_at: string;
      }
      
      export interface AssignmentData {
        agent_id: number;
        bale_id: number;
        created_at: string;
        updated_at: string;
      }



      export interface TradersInteractedData{
        agent_name:string;
        interaction_count:number;
      }

      export interface SalesData{
        month:string;
        total_sales:string;
      }


      export interface SellersData {
        sellers: string[];
      }



      // market/types.ts

// utils/types.ts

export interface Product {
  product_id: number;
  product_name: string;
  price: string;
  material: string;
  description?: string | null;
  trader?: number;
  image?: File | null;
}

export interface ApiResponse {
  detail: string;
}


