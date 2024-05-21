import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get_orders, edit_order } from "../api/orders";
import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Props {
    results: any;
}

const Orders = ({ results }: Props) => {

    const queryClient = useQueryClient();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: get_orders,
    });

    const [filteredOrders, setFilteredOrders] = useState(data);

    useEffect(() => {
        // comprobar si hay datos
        if (data)
            setFilteredOrders(data);
        else
            setFilteredOrders([]);
    }, [data]);
    
    const handleChange = (e: any) => {
        if (e.target.checked) {
            setFilteredOrders(data);
        } else {
            const filtered = data.filter((o: any) => o.is_delivered === false);
            setFilteredOrders(filtered);
        }
    };

    const editOrderMut = useMutation({
        mutationFn: edit_order,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Order delivered!");
        },
        onError: () => {
            toast.error("Error!");
        },
    });

    if (isError) return toast.error("Error!");
    if (isLoading) return <Loader />;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    onChange={handleChange}
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    defaultChecked={true}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="checkbox-all-search"
                                    className="sr-only"
                                >
                                </label>
                                <span className="ml-2">Mostrar Entregados</span>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ID Pedido
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Usuario
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Telefono
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Precio Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Productos
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Detalles del Pedido
                        </th>

                    </tr>
                </thead>

                {results && results.orders.length > 0 ? (

                    <>
                        {results &&
                            results.orders.map((o: any) => (
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    onClick={() => editOrderMut.mutate(o.id)}
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    checked={o.is_delivered}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label
                                                    htmlFor="checkbox-table-search-1"
                                                    className="sr-only"
                                                >
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {o.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {o.user}

                                        </td>
                                        <td className="px-6 py-4">
                                            {o.phone}
                                        </td>
                                        <td className="px-6 py-4">
                                            $ {o.total_price}
                                        </td>

                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/order/${o.id}`}
                                            >
                                                Ver mas...
                                            </Link>
                                        </td>

                                        <td className="px-6 py-4">
                                            <Link
                                                to={`/order/${o.id}`}
                                            >
                                                Ver mas...
                                            </Link>
                                        </td>

                                    </tr>


                                </tbody>


                            ))}
                    </>

                ) : (

                    <tbody>
                        {filteredOrders && filteredOrders.map((o: any) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            onClick={() => editOrderMut.mutate(o.id)}
                                            id="checkbox-table-search-1"
                                            type="checkbox"
                                            checked={o.is_delivered}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="checkbox-table-search-1"
                                            className="sr-only"
                                        >
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {o.id}
                                </th>
                                <td className="px-6 py-4">
                                    {o.user}

                                </td>
                                <td className="px-6 py-4">
                                    {o.phone}
                                </td>
                                <td className="px-6 py-4">
                                    $ {o.total_price}
                                </td>

                                <td className="px-6 py-4">
                                    <Link
                                        to={`/order/${o.id}`}
                                    >
                                        Ver mas...
                                    </Link>
                                </td>

                                <td className="px-6 py-4">
                                    <Link
                                        to={`/order/${o.id}`}
                                    >
                                        Ver mas...
                                    </Link>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                )}


            </table>
        </div>
    );
};
export default Orders;