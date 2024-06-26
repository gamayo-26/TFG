import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Pizzeta from "../assets/Pizzeta.jpg";
import Mediana from "../assets/Mediana.jpg";
import Familiar from "../assets/Familiar.jpg";
import Hamburgesa from "../assets/Hamburgesa.jpg";
import Bocadillo from "../assets/Bocadillo.jpg";
import Ensalada from "../assets/Ensalada.jpg";
import Perrito from "../assets/Perrito.jpg";
import Entrantes from "../assets/Entrantes.jpg";
import Bebida from "../assets/Bebida.jpg";
import Sandwich from "../assets/Sandwich.jpg";

const CatePage = () => {

    return (
        <div className="flex justify-center">
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16">

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Pizzeta`}>
                        <img
                            className="rounded-t-lg"
                            src={Pizzeta}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Pizzeta`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Pizzeta
                            </h5>
                        </Link>
                    </div>
                </div>

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Pizza Mediana`}>
                        <img
                            className="rounded-t-lg"
                            src={Mediana}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/cate/Pizza Mediana`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Medianas
                            </h5>
                        </Link>
                    </div>
                </div>

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Pizza Familiar`}>
                        <img
                            className="rounded-t-lg"
                            src={Familiar}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Pizza Familiar`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Familiares
                            </h5>
                        </Link>
                    </div>
                </div>
                    
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Hamburguesas`}>
                        <img
                            className="rounded-t-lg"
                            src={Hamburgesa}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Hamburguesas`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Hamburguesa
                            </h5>
                        </Link>
                    </div>
                </div>    
                
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Bocadillo`}>
                        <img
                            className="rounded-t-lg"
                            src={Bocadillo}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Bocadillo`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Bocadillos
                            </h5>
                        </Link>
                    </div>
                </div>
                    
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Ensalada`}>
                        <img
                            className="rounded-t-lg"
                            src={Ensalada}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Ensalada`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Ensaladas
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Perrito`}>
                        <img
                            className="rounded-t-lg"
                            src={Perrito}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Perrito`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Perritos
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Sandwich`}>
                        <img
                            className="rounded-t-lg"
                            src={Sandwich}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Sandwich`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Sandwiches
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Picoteo`}>
                        <img
                            className="rounded-t-lg"
                            src={Entrantes}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Picoteo`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Entrantes
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Postre`}>
                        <img
                            className="rounded-t-lg"
                            src={logo}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Postre`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Postres
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Bebida`}>
                        <img
                            className="rounded-t-lg"
                            src={Bebida}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Bebida`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Bebidas
                            </h5>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CatePage;