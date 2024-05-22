import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { get_product } from "../api/products";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartStore } from "../store/cart";

const SoloProduct = () => {

    const addToCart = useCartStore(state => state.addToCart);

    const { slug } = useParams();

    let new_slug: string;
    if (slug !== undefined) {
        new_slug = slug;
        console.log(new_slug);
    }

    const { data, isError, isLoading } = useQuery({
        queryKey: ["product", slug],
        queryFn: () => get_product(new_slug),
    })

    console.log(data);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return toast.error("Error!");
    }


    return (

        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image */}
                    <div className="flex flex-col-reverse">
                        <div className="w-full aspect-w-1 aspect-h-1">
                            <img
                                src={`${import.meta.env.VITE_BAKEND_URL}${data.image}`}
                                className="w-full h-full object-center object-cover sm:rounded-lg"
                            />
                        </div>
                    </div>
                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-blue-300">{data.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only text-white dark:text-white">{data.description}</h2>
                            <p className="text-3xl text-green-300">€{data.price}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>

                            <div
                                className="text-base text-gray-700 space-y-6"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            />
                        </div>

                        <form className="mt-6">
                            <div className="mt-10 flex sm:flex-col1">
                                <button
                                    onClick={() => addToCart(data)}
                                    type="submit"
                                    className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </form>

                        <section aria-labelledby="details-heading" className="mt-12">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>
                        </section>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SoloProduct;