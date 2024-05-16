import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const CatePage = () => {

    return (
        <div className="flex justify-center">
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16">

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/pizza`}>
                        <img
                            className="rounded-t-lg"
                            src={logo}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/pizza`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Pizzas
                            </h5>
                        </Link>
                    </div>
                </div>

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Keyboards`}>
                        <img
                            className="rounded-t-lg"
                            src={logo}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/cate/Keyboards`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Keyboards
                            </h5>
                        </Link>
                    </div>
                </div>

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/menu/Lang`}>
                        <img
                            className="rounded-t-lg"
                            src={logo}
                            alt=""
                        />
                    </Link>
                    <div className="p-5 ">
                        <Link to={`/menu/Lang`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Lang
                            </h5>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default CatePage;