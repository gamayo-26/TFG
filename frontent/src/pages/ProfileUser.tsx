import { useAuthStore } from "../store/auth";
import { Token } from "../interfaces";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { edit_user, get_solo_user, deleteRequest } from "../api/users";
import { toast } from "react-hot-toast";
import { my_orders } from "../api/orders";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import logo_user from "../assets/logo_user.png";

const UserProfile = () => {

    const [show, setShow] = useState(true);
    const [stateName, setStateName] = useState<string>("");
    const [stateLast, setStateLast] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const token: string = useAuthStore.getState().access;
    const tokenDecoded: Token = jwt_decode(token);
    const id = tokenDecoded.user_id;

    const { data: user } = useQuery({
        queryKey: ['users', id],
        queryFn: () => get_solo_user(id)
    })

    useEffect(() => {
        if (user) {
            setStateName(user.name);
            setStateLast(user.last_name);
            setPhone(user.phone);
        }
    }, [user]);

    const queryClient = useQueryClient();

    const editProfileMut = useMutation({
        mutationFn: edit_user,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Profile updated!");
            setShow(true);
        },
        onError: () => {
            toast.error("Error!");
            setShow(true);
        },
    });

    const { data, isError, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: my_orders
    })


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editProfileMut.mutate({
            id: user.id,
            name: stateName,
            last_name: stateLast,
            phone: user.phone,
            email: user.email,
        });
    };

    // Funcion para eliminar la cuenta
    const deleteAccount = async () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) {
            await deleteRequest(user.email);
            toast.success('Cuenta eliminada');
        }
    }


    if (user === undefined) return <p>No user here!</p>

    if (isError) return toast.error("Error!")
    if (isLoading) return <Loader />

    return (
        <div className="flex justify-center pt-[100px]">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {show ? (
                    <>
                        <div className="flex flex-col items-center pb-10">


                            <img
                                className="w-24 h-24 mb-3 mt-3 rounded-full shadow-lg"

                                src={logo_user}
                                alt="User image"
                            />

                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                {user.email}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {user.name} {user.last_name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {user.phone}
                            </span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <button
                                    onClick={() => setShow(false)}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                >
                                    Editar Perfil
                                </button>
                            </div>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <button
                                    onClick={() => deleteAccount()}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-200"
                                >
                                    Eliminar Cuenta
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Numero de Orden</th>
                                        <th scope="col" className="px-4 py-3">Informacion</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data && data.map((order: any) => (
                                        <tr className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {order.id}
                                            </th>
                                            <td className="px-4 py-3">
                                                <Link
                                                    to={`/order/${order.id}/`}
                                                    className="p-2 cursor-pointer rounded-lg bg-gray-900 hover:bg-gray-700">
                                                    Ver mas ...
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </>
                ) : (
                    <div className="p-11">
                        <form onSubmit={handleSubmit}>
                            <div className="p-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={stateName}
                                    onChange={(e) =>
                                        setStateName(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Name"
                                />
                            </div>

                            <div className="p-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    value={stateLast}
                                    onChange={(e) =>
                                        setStateLast(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Last name"
                                />
                            </div>
                            <div className="p-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Telefono
                                </label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) =>
                                        setPhone(e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Last name"
                                />
                            </div>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;