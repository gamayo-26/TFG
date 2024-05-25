import { BsFillTrashFill } from "react-icons/bs";
import { deleteRequest, getUsers } from "../api/users";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { User } from "../interfaces";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";


interface Props {
    results: any
}

const Users = ({ results }: Props) => {

    // Obtener los usuarios
    const { data, isError, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    const queryClient = useQueryClient();

    const deleteRequestMut = useMutation({
        mutationFn: deleteRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success('Usuario eliminado exitosamente!')
        },
        onError: () => {
            toast.error("Error!");
        },
    });

    console.log(results);

    // Si está cargando
    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return toast.error('Error al obtener los usuarios');
    }

    if (deleteRequestMut.isLoading) {
        return <Loader />;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">ID</th>
                        <th scope="col" className="px-4 py-3">Email</th>
                        <th scope="col" className="px-4 py-3">Nombre</th>
                        <th scope="col" className="px-4 py-3">Apellido</th>
                        <th scope="col" className="px-4 py-3 flex items-center justify-center gap-4">Actions</th>
                    </tr>
                </thead>
                {results && results.users.length > 0 ? (
                    <tbody>
                        {results &&
                            results.users.map((user: User) => (
                                <tr className="border-b dark:border-gray-700">
                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}
                                    </th>
                                    <td className="px-4 py-3">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        {user.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {user.last_name}
                                    </td>
                                    <td className="px-4 py-3 flex items-center justify-center gap-4">
                                        <BsFillTrashFill size={22}
                                            onClick={() => deleteRequestMut.mutate(user.email)}
                                            className="text-red-300 cursor-pointer" />
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                ) : (
                    <tbody>
                        {data && data.map((user: User) => (
                            <tr className="border-b dark:border-gray-700">
                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.id}
                                </th>
                                <td className="px-4 py-3">
                                    {user.email}
                                </td>
                                <td className="px-4 py-3">
                                    {user.name}
                                </td>
                                <td className="px-4 py-3">
                                    {user.last_name}
                                </td>
                                <td className="px-4 py-3 flex items-center justify-center gap-4">
                                    <BsFillTrashFill size={22}
                                        onClick={() => deleteRequestMut.mutate(user.email)}
                                        className="text-red-400 cursor-pointer" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default Users;