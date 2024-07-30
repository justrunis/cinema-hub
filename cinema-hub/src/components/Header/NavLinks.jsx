import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFilm,
  FaTv,
  FaQuestionCircle,
  FaHeart,
} from "react-icons/fa";

export default function NavLinks() {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-primary-content hover:text-accent"
          }`
        }
      >
        <FaHome className="inline mr-2" />
        Home
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-primary-content hover:text-accent"
          }`
        }
      >
        <FaHeart className="inline mr-2" />
        Favorites
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-primary-content hover:text-accent"
          }`
        }
      >
        <FaFilm className="inline mr-2" />
        Movies
      </NavLink>
      <NavLink
        to="/shows"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-primary-content hover:text-accent"
          }`
        }
      >
        <FaTv className="inline mr-2" />
        TV shows
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-primary-content hover:text-accent"
          }`
        }
      >
        <FaQuestionCircle className="inline mr-2" />
        About
      </NavLink>
    </>
  );
}
