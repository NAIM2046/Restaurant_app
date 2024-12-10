import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { TiShoppingCart } from "react-icons/ti";
import useCards from "../../../useMenu/useCards";

const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const [card] = useCards();
  //console.log(card);
  const handlelogout = () => {
    logOut();
  };
  const Navopation = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/order/Salad">Order Food</Link>
      </li>
      <li>
        <Link to="/dashboard/card">
          <div className="flex flex-col-1 gap-2 justify-center">
            <div className="badge badge-secondary"> DashBoard</div>
          </div>
        </Link>
      </li>
      {!user && (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
      {user && (
        <li>
          <Link onClick={handlelogout}>LogOut</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar fixed z-10 bg-opacity-30 bg-black text-yellow-500 max-w-[1280px] mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {Navopation}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Bisto Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Navopation}</ul>
      </div>
      <div className="navbar-end">
        <a className="btn">{user && user?.displayName}</a>
      </div>
    </div>
  );
};

export default Navber;
