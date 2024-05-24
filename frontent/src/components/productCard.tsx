import { Link } from 'react-router-dom';
import { Producto } from '../interfaces';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';

interface Props {
    product: Producto
}


const ProductCard = ({ product }: Props) => {

    // comprobar si el usuario esta autenticado y obtener la funcion para agregar al carrito
    const { isAuth } = useAuthStore();
    const addToCart = useCartStore(state => state.addToCart)

    const handleAddToCart = () => {
        if (isAuth) {
            addToCart(product)
        } else {
            alert('Debes iniciar sesion para agregar al carrito')
        }
    }

    return (
        <div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/product/${product.slug}`}>
                    <div className="flex justify-center">
                        <img className="rounded" src={`${import.meta.env.VITE_BAKEND_URL}${product.image}`} alt="" />
                    </div>
                </Link>
                <div className="p-5 ">
                    <Link to={`/product/${product.slug}`}>
                        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {product.name}
                        </h5>
                        <div className="flex justify-between">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-600 dark:text-green-600">
                                {product.price} €
                            </h5>
                        </div>
                    </Link>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
                        {product.description}
                    </p>
                    <button
                        onClick={() => handleAddToCart()}
                        className="inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Añadir al carrito
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd">
                            </path>
                        </svg>
                    </button>
                    <Link to={`/product/${product.slug}`} className="inline-flex items-center mx-3
                        px-3 py-2 text-sm font-medium text-center text-white 
                        bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
                        dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">
                        Ver más
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd">
                            </path>
                        </svg>
                    </Link>

                </div>

            </div>
        </div>

    )


}
export default ProductCard;