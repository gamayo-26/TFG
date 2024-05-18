export interface Producto {
    id: number
    name: string
    slug: string
    description: string
    price: number
    rating?: number
    count_in_stock : number
    category: string
    image: File | null;
    quantity?: number
    num_reviews?: number
}

export interface User {
    id: number
    email: string
    name: string
    last_name: string
}
  
export interface Token {
    exp: number;
    is_staff: boolean;
}

export interface Order {
    total_price: number;
    address: string;
    city: string;
    postal_code: string;
    phone: string;
    comentary: string;
    order_items: Producto[];
}