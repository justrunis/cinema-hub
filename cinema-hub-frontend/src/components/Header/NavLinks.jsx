import { NavLink } from "react-router-dom";
import { FaHome, FaFilm, FaTv, FaQuestionCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";

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
        to="/profile"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-primary-content hover:text-accent"
          }`
        }
      >
        <CgProfile className="inline mr-2" />
        Profile
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
      <NavLink
        to="/admin"
        className={({ isActive }) =>
          `flex flex-row justify-center items-center text-sm lg:text-lg font-bold mr-5 ${
            isActive ? "text-accent" : "text-primary-content hover:text-accent"
          }`
        }
      >
        <RiAdminFill className="inline mr-2" />
        Admin
      </NavLink>
    </>
  );
}
