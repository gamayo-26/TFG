import { authAxios, axi } from "./useAxios";

// Funcion para obtener los usuariso
export const getUsers = async () => {
    const response = await authAxios.get('/users/get');
    return response.data;
};


// Función para realizar una solicitud de registro
export const registerRequest = async (email: string, name: string, last_name: string, password: string ) => {

    // Realizar una solicitud POST a la ruta '/users/register/' con los datos proporcionados
    await axi.post('/users/register/', {email, name, last_name, password});

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