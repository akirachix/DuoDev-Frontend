import { Url } from "next/dist/shared/lib/router/router";


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
export  interface TextileBaleData {
        image:Url;
        id:number;
        location:string;
        waste_type:string; 
        phone_number:string | null;
        product: number;
        status: string;
        price:string
    }