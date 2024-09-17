import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFilm,
  FaTv,
  FaQuestionCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { CgProfile, CgLogIn } from "react-icons/cg";
import { CiLogin, CiLogout } from "react-icons/ci";
import { RiAdminFill } from "react-icons/ri";
import { AuthVerify, getUserRole } from "../../auth/auth";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/slices/login";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../api/http";
import { useEffect } from "react";

export default function NavLinks({ closeMenu }) {
  const token = localStorage.getItem("cinema-hub-token");
  const userRole = getUserRole(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(loginActions.logout());
    localStorage.removeItem("cinema-hub-token");
    queryClient.clear();
    navigate("/login");
  };

  useEffect(() => {
    AuthVerify(token);
  }, [token]);

  const handleLinkClick = () => {
    if (closeMenu) {
      closeMenu();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:items-end">
      {/* Left-aligned Navigation Links */}
      <div className="flex flex-col lg:flex-row gap-4">
        <NavLink
          to="/"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center text-sm lg:text-lg font-bold ${
              isActive
                ? "text-accent"
                : "text-primary-content hover:text-accent"
            }`
          }
        >
          <FaHome className="inline mr-2" />
          Home
        </NavLink>
        <NavLink
          to="/movies"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center text-sm lg:text-lg font-bold ${
              isActive
                ? "text-accent"
                : "text-primary-content hover:text-accent"
            }`
          }
        >
          <FaFilm className="inline mr-2" />
          Movies
        </NavLink>
        <NavLink
          to="/shows"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center text-sm lg:text-lg font-bold ${
              isActive
                ? "text-accent"
                : "text-primary-content hover:text-accent"
            }`
          }
        >
          <FaTv className="inline mr-2" />
          TV Shows
        </NavLink>
        {token && (
          <NavLink
            to="/trivia"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center text-sm lg:text-lg font-bold ${
                isActive
                  ? "text-accent"
                  : "text-primary-content hover:text-accent"
              }`
            }
          >
            <FaRegQuestionCircle className="inline mr-2" />
            Trivia
          </NavLink>
        )}{" "}
        {userRole === "admin" && (
          <NavLink
            to="/admin"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center text-sm lg:text-lg font-bold ${
                isActive
                  ? "text-accent"
                  : "text-primary-content hover:text-accent"
              }`
            }
          >
            <RiAdminFill className="inline mr-2" />
            Admin
          </NavLink>
        )}
        <NavLink
          to="/about"
          onClick={handleLinkClick}
          className={({ isActive }) =>
            `flex items-center text-sm lg:text-lg font-bold ${
              isActive
                ? "text-accent"
                : "text-primary-content hover:text-accent"
            }`
          }
        >
          <FaQuestionCircle className="inline mr-2" />
          About
        </NavLink>
      </div>

      {/* Right-aligned User Links */}
      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        {token && (
          <>
            <NavLink
              to="/profile"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center text-sm lg:text-lg font-bold ${
                  isActive
                    ? "text-accent"
                    : "text-primary-content hover:text-accent"
                }`
              }
            >
              <CgProfile className="inline mr-2" />
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm lg:text-lg font-bold text-primary-content hover:text-accent"
            >
              <CiLogout className="inline mr-2" />
              Logout
            </button>
          </>
        )}
        {!token && (
          <>
            <NavLink
              to="/login"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center text-sm lg:text-lg font-bold ${
                  isActive
                    ? "text-accent"
                    : "text-primary-content hover:text-accent"
                }`
              }
            >
              <CiLogin className="inline mr-2" />
              Login
            </NavLink>
            <NavLink
              to="/register"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center text-sm lg:text-lg font-bold ${
                  isActive
                    ? "text-accent"
                    : "text-primary-content hover:text-accent"
                }`
              }
            >
              <CgLogIn className="inline mr-2" />
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}
