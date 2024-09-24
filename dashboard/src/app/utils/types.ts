import { Url } from "next/dist/shared/lib/router/router";


// orders types
export  interface OrderData {
        id:number;
        location:string;
        phone_number:string | null;
        product: number;
        status: string;
        order_number:string;
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
        price:string;
        bale_id:number
        trader:string | null
}


export interface AgentsData{
        id:number;
        bale_id:number;
        agent_name:string;
        location:string;
        user:number;
        agent_id: string;
        textile_bale_id: string
}

export interface AssignmentData{
        foot_agent_id: string,
        textile_bale_id: string,
        agent_id: string,
        bale_id:string,
        agent_name:string
}