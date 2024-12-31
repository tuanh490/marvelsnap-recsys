import React from "react";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "../assets/logo.png";
import axios from "axios";
import { useAuth } from "./context/useAuth";

const Navbar: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AppBar position="static" className="bg-gray-900 p-2">
      <Toolbar className="flex justify-between items-center">
        <IconButton edge="start" className="hover:opacity-80">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-20" />
          </Link>
        </IconButton>
        <div
          className={`flex justify-center ${user && "flex-grow"} space-x-4 font-semibold`}
        >
          {!user && (
            <>
              <Button className="hover:opacity-80">
                <Link className="text-white text-xl" to="/login">
                  Login
                </Link>
              </Button>
              <Button className="hover:opacity-80">
                <Link className="text-white text-xl" to="/register">
                  Register
                </Link>
              </Button>
            </>
          )}
        </div>

        {user && (
          <div>
            <Button
              color="secondary"
              onClick={handleLogout}
              className="text-white hover:bg-blue-950 mb-2"
            >
              Logout
            </Button>
            <IconButton className="hover:opacity-80">
              <Link to="/profile">
                <AccountCircleIcon className="text-white text-4xl" />
              </Link>
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
