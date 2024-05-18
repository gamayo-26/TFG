import { authAxios} from "./useAxios";
import { Order } from "../interfaces";


export const create_order = async (data: Order) => {
    authAxios.post('/orders/add/', data);
}

