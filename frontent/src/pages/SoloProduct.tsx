import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { get_product } from "../api/products";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";


const SoloProduct = () => {

    const  { slug } = useParams();

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
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {data.name}
                    </h2>
                    <p className="mb-4 font-bold">
                        {data.description}
                    </p>
                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to Cart
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd">
                            </path>
                        </svg>
                    </a>
                </div>

                <img className="w-full"
                    src={`${import.meta.env.VITE_BAKEND_URL}${data.image}`}/>
            </div>
        </div>
    );

}
export default SoloProduct;