import { NavLink } from "react-router-dom";
import { FaHome, FaFilm, FaTv } from "react-icons/fa";

export default function NavLinks() {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-base-content hover:text-accent"
          }`
        }
      >
        <FaHome className="inline mr-2" />
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-base-content hover:text-accent"
          }`
        }
      >
        <FaFilm className="inline mr-2" />
        Movies
      </NavLink>
      <NavLink
        to="/series"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-base-content hover:text-accent"
          }`
        }
      >
        <FaTv className="inline mr-2" />
        TV Series
      </NavLink>
    </>
  );
}
