import { User } from "../interfaces";
import { authAxios, axi } from "./useAxios";

// Funcion para obtener los usuariso
export const getUsers = async () => {
    const response = await authAxios.get('/users/get');
    return response.data;
};

// Funcion para buscar un usuario en la base de datos
export const search_users = async (query: string) => {
    const response = await authAxios.get(`/users/search/?query=${query}`);
    return response.data;
};



// Función para realizar una solicitud de registro
export const registerRequest = async (email: string, name: string, last_name: string, password: string, phone: string ) => {

    // Realizar una solicitud POST a la ruta '/users/register/' con los datos proporcionados
    await axi.post('/users/register/', {email, name, last_name, password, phone});

}; 

export const loginRequest = async (email: string, password: string ) => {

    // Realizar una solicitud POST a la ruta '/users/login/' con los datos proporcionados
    const response = await axi.post('/users/login/', {email, password});
    return response;
    
}; 

export const deleteRequest = async (email: string) => {
    
        // Realizar una solicitud DELETE a la ruta '/users/delete/' con el id proporcionado
        await authAxios.delete(`/users/delete/${email}/`);
        
    };

    export const get_solo_user = async (id: number) => {
        const response = await authAxios.get(`/users/get/solo/${id}/`) 
        return response.data
    };
    
    export const edit_user = async (data: User) => {
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("last_name", data.last_name)
        formData.append("phene", data.phone)
        formData.append("email", data.email)
        await authAxios.put(`/users/edit/${data.email}/`, formData)
    };