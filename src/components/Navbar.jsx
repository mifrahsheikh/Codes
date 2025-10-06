import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const isLoggedIn = !!token && !!role;

  return (
    <nav className="w-full h-27 flex items-center justify-between p-4 bg-black70 backdrop-brightness-20 fixed top-0 shadow z-50">
      <h1 className="text-2xl font-bold text-emerald-400">LocalPulse</h1>


      <div>
        {!isLoggedIn && (
          <button
            className="px-4 py-2 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-gray-200 transition"
            onClick={() => navigate("/login", { state: { role: "businessuser", from: "navbar" } })}
          >
            Sign In
          </button>
        )}

        {isLoggedIn && (
          <button
            className="text-white ml-4 hover:underline"
            onClick={() => {
              if (role === "admin") navigate("/admin");
              else if (role === "businessuser") navigate("/businessuser");
              else navigate("/user");
            }}
          >
            {username} (
            {role === "user"
              ? "User"
              : role === "businessuser"
              ? "Business User"
              : role === "admin"
              ? "Admin"
              : ""}
            )
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
