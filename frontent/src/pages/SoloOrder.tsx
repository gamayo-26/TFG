import { useParams } from "react-router-dom";
import { solo_order } from "../api/orders";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

const SoloOrder = () => {
    const { id } = useParams();

    
    let new_id: number;
    
    if (id !== undefined) {
        new_id = Number(id);
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: () => solo_order(new_id),
    });
    
    if (isError) return toast.error("Error!");
    if (isLoading) return <Loader />;
    if (!data) return <Loader />;

    return (
        <div className="overflow-x-auto container mx-auto px-4 pt-11">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-orange-400 dark:text-gray-200">
                    <tr>
                        <th scope="col" className="px-4 py-3 text-center">
                            Telefono
                        </th>

                        <th scope="col" className="px-4 py-3 text-center">
                            Ciudad
                        </th>

                        <th scope="col" className="px-4 py-3 text-center">
                            Direccion
                        </th>

                        <th scope="col" className="px-4 py-3 text-center">
                            Hora de creacion
                        </th>

                        <th scope="col" className="px-4 py-3 text-center">
                            Hora de entrega
                        </th>

                        <th scope="col" className="px-4 py-3 text-center">
                            Precio total
                        </th>

                        <th scope="col" className="px-4 py-3 text-center">
                            Estado
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr className="border-b dark:border-gray-700">
                        <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                        >
                                {data && data.user !== undefined && (
                                    <>
                                        {data.user.phone}
                                    </>
                                )}
                        </th>

                        <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-4">
                                {data && data.shipping_address !== undefined && (
                                    <>
                                        {data.shipping_address.city}
                                    </>
                                )}
                            </div>
                        </td>

                        <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-4">

                                {data && data.shipping_address !== undefined && (
                                    <>
                                        {data.shipping_address.address}
                                    </>
                                )}
                            </div>
                        </td>

                        <td className="px-4 py-3 text-center">
                            {new Date(data.created_at).toLocaleString()}
                        </td>

                        <td className="px-4 py-3 text-center">
                            {(data.hora_entrega)}
                        </td>
                        <th
                            scope="row "
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                        >
                            $ {data.total_price}
                        </th>

                        <td className="px-4 py-3 text-center">
                            {data.status === 0 ? (
                                <p>En preparacion</p>
                            ) : data.status === 1 ? (
                                <p>En reparto</p>
                            ) : data.status === 2 ? (
                                <p>Entregado</p>
                            ) : (
                                <p>Cancelado</p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-11 ">
                <thead className="text-xs text-gray-700 uppercase bg-orange-400 dark:text-gray-200">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            ID Producto
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Producto
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Cantidad
                        </th>

                        <th scope="col" className="px-4 py-3">
                            Precio
                        </th>
                    </tr>
                </thead>


                <tbody>
                    {data.order_items && data.order_items.map((p: any) => (

                        <tr className="border-b dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {p.product}
                            </th>
                            
                            <td className="px-4 py-3 ">
                                {p.name}
                            </td>

                            <td className="px-4 py-3">
                                {p.quantity}
                            </td>

                            <td className="px-4 py-3">
                                $ {p.price}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default SoloOrder;