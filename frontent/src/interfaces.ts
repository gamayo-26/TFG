export interface Producto {
    id: number
    name: string
    slug: string
    description: string
    price: number
    category: string
    image: File | null;
    quantity?: number
}

export interface User {
    id: number
    email: string
    name: string
    phone: string
    last_name: string
}
  
export interface Token {
    exp: number;
    user_id: number;
    email: string;
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