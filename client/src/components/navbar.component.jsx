import { React, useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState(null);
  let {
    userAuth,
    userAuth: { access_token, role },
    setUserAuth,
  } = useContext(UserContext);

  const fetchUserDetail = async () => {

    if(access_token){
   await axios.post(
        process.env.REACT_APP_SERVER_DOMAIN + "/get-user",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      ).then((user) => {
        setUsers(user)
      })
      .catch ((error) => {
      console.error(error);
    }
  )
}
  };

  useEffect(() => {
    fetchUserDetail();
  }, [access_token]);

  let cartItemNumber = users ? users.data.account_info.total_item_in_cart : 0;

  const handleLogout = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };
  return (
    <>
      <div className="navbar">
        <nav className="grid gap-4 w-full">
          <div className=" md:flex items-center justify-between text-2xl p-2">
            {/* logo for larger screen */}
            <div className="hidden md:flex">
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-semibold"
              >
                <i className="fi fi-rr-gift-card"></i>
                <p className="">ODOP</p>
              </Link>
            </div>

            {/* links for larger screen */}
            <div className=" hidden md:flex items-center gap-4 justify-center space-x-2 text-2xl">
              <Link
                to="/"
                className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
              >
                Products
              </Link>
              <Link
                to="/districts"
                className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
              >
                Districts
              </Link>
              <Link
                to="/about"
                className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
              >
                Contact
              </Link>
              {access_token && role === "vendor" ? (
                <>
                  <Link
                    to="/seller/dashboard"
                    className="rounded-lg p-2 text-md font-semibold bg-white transition-all hover:bg-grey/40 duration-300"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-product"
                    className="rounded-lg p-2 text-md font-semibold bg-white transition-all hover:bg-grey/40 duration-300"
                  >
                    Sell a Product
                  </Link>
                  <Link
                    to={`/seller/profile/${""}`}
                    className="rounded-lg p-2 text-md font-semibold bg-white transition-all hover:bg-grey/40 duration-300"
                  >
                    Profile
                  </Link>
                </>
              ) : (
                <Link
                  to="/seller/signup"
                  className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
                >
                  Become a seller
                </Link>
              )}
            </div>
            {/* search and login  */}
            <div>
              <div className="md:flex items-center gap-4 ml-auto hidden">
                <div className="lg:flex sm:flex justify-between gap-1 hidden">
                  <input
                    className="p-3 rounded-lg w-72 sm:w-96 bg-grey focus:outline-none"
                    placeholder="Search the site..."
                    type="search"
                  />
                  <button>
                    <i className="fi fi-rr-search bg-grey p-3 rounded-full center"></i>
                  </button>
                </div>
                <div>
                  {access_token ? (
                    <div className=" flex flex-row gap-2">
                      <Link
                        to="/view_cart"
                        className="relative px-4 py-2 flex items-center justify-center gap-2 bg-black text-white font-semibold text-xl rounded-lg hover:opacity-80 duration-300"
                      >
                        <i className="fi fi-rr-shopping-cart relative"></i>
                        <p className="text-red inline-block absolute top-0 left-7">{cartItemNumber}</p>
                        <p className="sm:hidden lg:block ">Cart</p>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 flex items-center justify-center gap-2 bg-dark-grey text-white font-semibold text-xl rounded-lg hover:opacity-80 duration-300"
                      >
                        <i className="fi fi-rr-sign-in-alt"></i>
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="px-4 py-2 flex items-center justify-center gap-2 bg-dark-grey text-white font-semibold text-xl rounded-lg hover:opacity-80 duration-300"
                    >
                      <i className="fi fi-rr-sign-in-alt"></i>
                      Log In
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/*  */}
            <div className="md:hidden mx-4 my-2 flex items-center justify-between">
              <div>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-md font-semibold"
                >
                  <i className="fi fi-rr-gift-card"></i>
                  <p className="">ODOP</p>
                </Link>
              </div>

              <button
                className="justify-center "
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="fi fi-br-bars-staggered text-3xl "></i>
              </button>
              {isMenuOpen && (
                <div className=" mx-2 absolute z-50 top-[80px] right-0 bg-grey/70 p-4 border border-gray-300 rounded-lg shadow-md">
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/"
                      className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
                    >
                      Products
                    </Link>
                    <Link
                      to="/districts"
                      className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
                    >
                      Districts
                    </Link>
                    <Link
                      to="/about"
                      className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
                    >
                      About
                    </Link>
                    <Link
                      to="/contact"
                      className="ml-4 font-medium sm:ml-6 sm:font-semibold hover:text-gray-500 dark:hover:text-gray-400"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>{" "}
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
