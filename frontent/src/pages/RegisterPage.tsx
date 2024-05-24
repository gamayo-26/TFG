import { Link, Navigate, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { registerRequest } from '../api/users';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from "react-hot-toast"
import { useAuthStore } from '../store/auth';
import Loader from '../components/Loader';

// Define la pagina de registro de usuario
const RegisterPage = () => {
    // define las variables de estado para el formulario
    const navigate = useNavigate();
    const { isAuth } = useAuthStore();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');
    console.log(import.meta.env.VITE_BACKEND_URL)

    // Definiendo la mutacion para el registro
    const registerMutation = useMutation({
        mutationFn: () => registerRequest(email, name, last_name, password, phone),
        onSuccess: () => {
            toast.success('Registro exitoso!');
            navigate('/login');
        },
        onError: () => {
            toast.error('Error al registrar');
        }
    })

    // Funcion para verificar que las contraseñas coincidan
    const handleMatch = () => {
        if (password !== re_password || password === '' || re_password === '') {
            return false;
        } else {
            return true;
        }
    }

    // Funcion para comprobar que los campos no esten vacios
    const handleCorrect = () => {
        if (email === '' || name === '' || phone === '' || password === '' || re_password === '') {
            return false;
            
        } else {
            return true;
        }
    }

    // funcion para manejar el envio del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!handleMatch()) {
            toast.error('Las contraseñas no son correctas');
        } else if (!handleCorrect()) {
            toast.error('Por favor complete todos los campos');
        } else {
            registerMutation.mutate();
        }
    }

    if (registerMutation.isLoading) return <Loader />
    if (isAuth) return (<Navigate to="/" />)

    // Si el usuario ya esta autenticado, redirigir a la pagina principal
    return (
        <div className='min-h-[400px]'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[1000px] lg:py-0 ">
                <Link to="/" className="flex items-center mb-6 text-5xl font-semibold text-orange-400">
                    <img className="w-12 h-12 mr-2" src={Logo} alt="logo" />
                    <span>Pizza Sprint</span>
                </Link>
                <div className="w-full md:w-[400px] lg:w-[500px] bg-slate-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Crear una nueva cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email" name="email" id="email" className=
                                    {handleCorrect() ? "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" : "bg-red-50 border border-red-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-red-400 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"}
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                                <input
                                    type="name" name="name" id="name" className=
                                    {handleCorrect() ? "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :"bg-gray-50 border border-red-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-red-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} 
                                    placeholder="username"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                                <input
                                    type="last_name" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"
                                    value={last_name} onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="Telefono" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
                                <input
                                    type="tel" name="Telefono" id="Telefono" autoComplete="tel" className=
                                    {handleCorrect() ? "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500": "bg-gray-50 border border-red-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-red-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                                    placeholder="username"
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input
                                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="re-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password" name="re-password" id="re-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={re_password} onChange={(e) => setRePassword(e.target.value)}
                                />
                            </div>
                            {handleMatch() ? false : <p className="text-sm font-medium text-red-500">Las contraseñas no coinciden</p>}
                            {handleCorrect() ? false : <p className="text-sm font-medium text-red-500">Por favor complete todos los campos obligatorios</p>}
                            <button type="submit" className="w-full text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-400 dark:focus:ring-primary-800">Registrarse</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Tienes cuenta? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Inicia sesión
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;