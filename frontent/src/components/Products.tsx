import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { delete_product, get_products } from "../api/products";
import Loader from "./Loader";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import React from "react";
import { Producto } from "../interfaces";


interface Props {
    results: any
}

const Products = ({ results }: Props) => {
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    const { data, isLoading, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['products'],
        get_products,
        {
            getNextPageParam: (page: any) => page.meta.next
        }
    )

    const queryClient = useQueryClient();

    const deleteProdMutation = useMutation({
        mutationFn: delete_product,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success('Product deleted successfully')
        },
        onError: () => {
            toast.error("Error!");
        },
    });

    if (deleteProdMutation.isLoading) {
        return <Loader />;
    }
    if (error instanceof Error) return <>{toast.error(error.message)}</>

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">Product ID</th>
                        <th scope="col" className="px-4 py-3">Name</th>
                        <th scope="col" className="px-4 py-3">Descripction</th>
                        <th scope="col" className="px-4 py-3">Price</th>
                        <th scope="col" className="px-4 py-3">Stock</th>
                        <th scope="col" className="px-4 py-3 flex justify-center gap-4">
                            Actions
                            <Link to="add">
                                <FaRegPlusSquare size={16} className="text-green-300 cursor-pointer" />
                            </Link>
                        </th>
                    </tr>
                </thead>
                {results &&  results.product.length > 0 ? (
                    <>
                        {results &&
                            results.product.map((product: Producto) => (
                                <tbody>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.id}
                                        </th>
                                        <td className="px-4 py-3">
                                            {product.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {product.description}
                                        </td>
                                        <td className="px-4 py-3">
                                            {product.price}
                                        </td>
                                        <td className="px-4 py-3">
                                            {product.count_in_stock}
                                        </td>
                                        <td className="px-4 py-3 flex items-center justify-center gap-4">
                                            <BsFillTrashFill onClick={() => deleteProdMutation.mutate(product.id)} size={22} className="text-red-400 cursor-pointer" />
                                            <Link to={`edit/${product.id}`}>
                                                <AiFillEdit size={22} className="text-blue-400 cursor-pointer" />
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                    </>
                ) : (
                    <>
                        {data?.pages.map((page: any, index: number) => (
                            <React.Fragment key={index}>
                                <tbody
                                    key={page.meta.next}>
                                    {page.data.map((product: Producto) => (

                                        <tr className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {product.id}
                                            </th>
                                            <td className="px-4 py-3">
                                                {product.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {product.description}
                                            </td>
                                            <td className="px-4 py-3">
                                                {product.price}
                                            </td>
                                            <td className="px-4 py-3">
                                                {product.count_in_stock}
                                            </td>
                                            <td className="px-4 py-3 flex items-center justify-center gap-4">
                                                <BsFillTrashFill onClick={() => deleteProdMutation.mutate(product.id)} size={22} className="text-red-400 cursor-pointer" />
                                                <Link to={`edit/${product.id}`}>
                                                    <AiFillEdit size={22} className="text-blue-400 cursor-pointer" />
                                                </Link>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>

                                {!isLoading && data?.pages.length === 0 && (
                                    <p className="text-xl text-slate-800 dark:text-slate-200">
                                        No more results
                                    </p>
                                )}
                                {!isLoading &&
                                    data?.pages?.length !== undefined &&
                                    data.pages.length > 0 &&
                                    hasNextPage && (
                                        <div ref={ref}>
                                            {isLoading || isFetchingNextPage ? (
                                                <p className="text-xl text-slate-800 dark:text-slate-200">
                                                    Loading more products...
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                            </React.Fragment>
                        ))}
                    </>
                )}

            </table>
        </div >
    )
}

export default Products;