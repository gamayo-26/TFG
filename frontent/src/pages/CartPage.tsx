import { useCartStore } from "../store/cart"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { create_order } from "../api/orders"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"


const CartPage = () => {

    const removeFromCart = useCartStore(state => state.removeFromCart)
    const addToCart = useCartStore(state => state.addToCart)
    const cart = useCartStore(state => state.cart);
    const total_price = useCartStore(state => state.totalPrice);
    const totalItems = useCartStore(state => state.totalItems);
    const clearCart = useCartStore(state => state.clearCart);

    //constantes par enviar la orden al backend
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postal_code, setPostalCode] = useState<string>('');
    const [comentary, setComentary] = useState<string>('');

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const currentHour = new Date().getHours();

    const create_order_mutation = useMutation({
        mutationFn: create_order,
        onSuccess: () => {
            clearCart()
            queryClient.invalidateQueries({ queryKey: ['orders'] })
            toast.success('Pedido creado con exito')
            navigate('/')
        },
        onError: () => {
            toast.error('Error al crear el pedido')
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        // Validar que la hora sea correcta
        event.preventDefault();
        if (currentHour < 1 || currentHour > 23) {
            toast.error('Los pedidos solo se pueden realizar entre las 19 y las 24 horas');
            return;
        }
        // Validar que los campos no esten vacios
        if (!phone || !address || !city || !postal_code) {
            toast.error('Todos los campos son obligatorios');
            return;
        }
        // Validar que el carrito no este vacio
        if (cart.length === 0) {
            toast.error('El carrito esta vacio');
            return;
        }
        create_order_mutation.mutate({
            total_price: total_price,
            address: address,
            phone: phone,
            city: city,
            postal_code: postal_code,
            order_items: cart,
            comentary: comentary,
        })
    }
    
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 flex flex-col lg:flex-row justify-between">
                {/*listado de productos en el carrito*/}
                <div className="w-full lg:w-2/3">
                    <div className="mx-auto max-w-screen-xl px-4 ">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                            <div className="relative mt-5 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                                <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                                    <div className="flex items-center flex-1 space-x-4">
                                        <h5>
                                            <span className="text-gray-600 text-xl font-bold dark:text-gray-200">Cantidad de Productos: {totalItems()}</span>
                                        </h5>
                                        <h5>
                                            <span className="text-gray-600 text-xl font-bold dark:text-gray-200">
                                                Precio total:
                                            </span>
                                        </h5>
                                        <h5>
                                            <div className="text-green-500 text-xl font-bold">
                                                €{total_price === null && '0'}{total_price.toFixed(2)}
                                            </div>
                                        </h5>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-orange-400 dark:bg-orange-400 dark:text-gray-800">
                                            <tr>
                                                <th scope="col" className="px-4 py-3">Producto</th>
                                                <th scope="col" className="px-4 py-3">Categoria</th>
                                                <th scope="col" className="px-4 py-3">Cantidad</th>
                                                <th scope="col" className="px-4 py-3">Precio</th>
                                                <th scope="col" className="px-4 py-3">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(product => (
                                                <>

                                                    <tr key={product.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <img src={`${import.meta.env.VITE_BAKEND_URL}${product.image}`} alt={product.name} className="w-auto h-8 mr-3" />

                                                            {product.name}
                                                        </th>
                                                        <td className="px-4 py-2">
                                                            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                                {product.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <div className="flex items-center space-x-3">
                                                                <button
                                                                    onClick={() => removeFromCart(product)}
                                                                    className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                                    <span className="sr-only">Quantity button</span>
                                                                    <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                                                </button>
                                                                <div>
                                                                    {product.quantity}
                                                                    <input type="number" id="first_product" className="hidden bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                                                                </div>
                                                                <button
                                                                    onClick={() => addToCart(product)}
                                                                    className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                                    <span className="sr-only">Quantity button</span>
                                                                    <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">€{product.price}</td>

                                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            €{product.quantity !== undefined ? (product.price * product.quantity).toFixed(2) : 0}</td>

                                                    </tr>

                                                </>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*cuestionario de contacto*/}
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
                    <div className="mx-auto max-w-screen-xl px-4">
                        <div className="bg-orange-400 dark:bg-orange-400 relative shadow-md sm:rounded-lg overflow-hidden px-4">
                            <div className="mx-auto max-w-2xl text-center mt-4">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">Datos de envio</h2>
                            </div>
                            <form className="mx-auto mt-1 max-w-xl sm:mt-2" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">Ciudad</label>
                                        <div className="mt-2.5">
                                            <input 
                                            onChange={(e) => setCity(e.target.value)}
                                            value={city}
                                            type="text" autoComplete="address-level2" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">Codigo Postal</label>
                                        <div className="mt-2.5">
                                            <input 
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            value={postal_code}
                                            type="text" autoComplete="postal-code" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">Direccion</label>
                                        <div className="mt-2.5">
                                            <input 
                                            onChange={(e) => setAddress(e.target.value)}
                                            value={address}
                                            type="text" autoComplete="street-address" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">Numero de Telefono</label>
                                        <div className="relative mt-2.5">
                                            <input 
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                            type="text" autoComplete="tel" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">Comentario sobre la entrega</label>
                                        <div className="mt-2.5">
                                            <textarea
                                            onChange={(e) => setComentary(e.target.value)}
                                            value={comentary}
                                            rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 mb-5">
                                        <button type="submit" className="block w-full rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Hacer pedido</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default CartPage;