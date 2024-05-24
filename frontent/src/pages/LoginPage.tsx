import { Link, Navigate, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { loginRequest } from '../api/users';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from "react-hot-toast"
import { useAuthStore } from '../store/auth';
import Loader from '../components/Loader';


const LoginPage = () => {

    // define las variables de estado para el formulario
    const navigate = useNavigate();
    const { isAuth } = useAuthStore();
    const setToken = useAuthStore(state => state.setTokens);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Definiendo la mutacion para el registro
    const loginMutation = useMutation({
        mutationFn: () => loginRequest(email, password),
        onSuccess: (response) => {
            setToken(response.data.access, response.data.refresh)
            toast.success('Vienvenido!')
            navigate('/')
        },
        onError: () => {
            toast.error('Error al iniciar sesion');
        }
    })

    // funcion para manejar el envio del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginMutation.mutate();
    }

    if (loginMutation.isLoading) return <Loader />
    if (isAuth) return (<Navigate to="/" />)

    return (
        <div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[800px] lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-5xl font-semibold text-orange-400">
                    <img className="w-12 h-12 mr-2" src={Logo} alt="logo" />
                    <span>Pizza Sprint</span>
                </Link>
                <div className="w-full md:w-[400px] lg:w-[500px] bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inicio de sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
                                <input
                                    type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input
                                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-400 dark:focus:ring-primary-800">
                                Iniciar sesión
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Ya tienes una cuenta? <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrate Ahora</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;