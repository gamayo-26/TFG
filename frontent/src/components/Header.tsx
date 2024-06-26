import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../store/theme";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import Logo from '../assets/logo.png'
import logo_user from '../assets/logo_user.png'
import jwt_decode from "jwt-decode"
import { useCartStore } from "../store/cart"
import { Token } from "../interfaces";
// new
//import { useSearchStore } from "../store/search";

const Header = () => {

    const { toggleDarkMode, darkMode } = useDarkMode();
    const token: string = useAuthStore.getState().access;
    const { isAuth } = useAuthStore()
    const { totalItems } = useCartStore();

    // new
    /*const searchTerm = useSearchStore((state) => state.searchTerm);
    const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
    */
    // end new -> pass to input

    if (isAuth) {
        const tokenDecoded: Token = jwt_decode(token)
        var is_admin = (tokenDecoded.is_staff);
    }

    function logOutFun() {
        useAuthStore.getState().logout()
        window.location.href = '/login'
    }

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    // data array de productos

    return (
        <Disclosure as="nav" className="bg-grey dark:bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 dark:text-slate-200 dark:hover:text-slate-50">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Link to={'/'}>
                                        <span className="sr-only">Pizza Sprint</span>
                                    <img
                                        className="hidden h-10 w-auto lg:block"
                                        src={Logo}
                                        alt="Logo"
                                    />
                                    </Link>
                                </div>


                                <div className="hidden sm:ml-6 sm:block">

                                    <div className="flex space-x-4">

                                        <Link
                                            to={'/'}
                                            className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                        >
                                            Inicio
                                        </Link>

                                        {isAuth ? (
                                            <>
                                                <Link
                                                    to={'/menu/'}
                                                    className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                                >
                                                    Categorias
                                                </Link>
                                            </>

                                        ) : (
                                            <>
                                                <Link
                                                    to={'/login'}
                                                    className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                                >
                                                    Iniciar sesión
                                                </Link>

                                                <Link
                                                    to={'/register'}
                                                    className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                                >
                                                    Registrarse
                                                </Link>
                                            </>
                                        )}

                                        {is_admin && is_admin && (
                                            <Link
                                                to={'/admin'}
                                                className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                            >
                                                Panel de administrador
                                            </Link>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <div className="absolute space-x-2 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    onClick={toggleDarkMode}
                                    type="button"
                                >
                                    {darkMode ?

                                        <BsFillMoonStarsFill size={20} className="text-slate-200 hover:text-white " />

                                        :

                                        <BsFillSunFill size={23} className="text-slate-900 hover:text-black" />}

                                </button>

                                <Link to={'/cart'} className="text-slate-900 hover:text-black dark:text-slate-200 dark:hover:text-white">
                                    <HiOutlineShoppingBag size={23} />
                                </Link>
                                <span className="text-slate-900 dark:text-slate-200">{totalItems()}</span>

                                {isAuth && (
                                    <Menu as="div" className="relative ml-2">
                                        <div>
                                            <Menu.Button className="flex rounded-full ml-8 text-sm focus:outline-none ">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={logo_user}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white dark:bg-slate-950 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="/profile"
                                                            className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}
                                                        >
                                                            Tu perfil
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <span
                                                            onClick={logOutFun}
                                                            className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer dark:text-slate-200')}
                                                        >
                                                            Cerrar sesión
                                                        </span>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                )}

                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {/*       item.current ? 'bg-slate-400 text-black dark:bg-gray-900 dark:text-white' : */}
                            {/*         'text-black hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white', */}
                            {/* 'block rounded-md px-3 py-2 text-base font-medium' */}
                            {isAuth ? (
                                <div className="w-full grid grid-cols-1">
                                    <Link
                                        to={'/'}
                                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    >
                                        Inicio
                                    </Link>

                                    <Link
                                        to={'/menu/'}
                                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    >
                                        Categorias
                                    </Link>
                                </div>

                            ) : (
                                <div className="w-full grid grid-cols-1">
                                    <Link
                                        to={'/'}
                                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    >
                                        Inicio
                                    </Link>
                                    <Link
                                        to={'/login'}
                                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    >
                                        Iniciar sesión
                                    </Link>

                                    <Link
                                        to={'/register'}
                                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            )}

                            {is_admin && (
                                <div className="w-full">
                                    <Link
                                        to={'/'}
                                        className='text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                    >
                                        Panel de administrador
                                    </Link>
                                </div>
                            )}

                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Header