import React from "react";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Link, useNavigate } from "@tanstack/react-router";
import logo from "../assets/logo.png";
import axios from "axios";
import { useAuth } from "./context/useAuth";

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

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

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window,
  });

  return (
    <ElevationScroll>
      <AppBar
        className={`p-2 top-0 transition-all duration-300  ${
          trigger ? "bg-gray-950" : "bg-transparent"
        }`}
      >
        <Toolbar className="flex justify-between items-center">
          <IconButton edge="start" className="hover:opacity-80">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-20" />
            </Link>
          </IconButton>
          <div
            className={`flex justify-center ${user && "flex-grow"} space-x-4 font-semibold`}
          >
            {!user ? (
              <>
                <Button className="hover:opacity-80">
                  <Link
                    className="text-white text-xl font-orbitron"
                    to="/login"
                  >
                    Login
                  </Link>
                </Button>
                <Button className="hover:opacity-80">
                  <Link
                    className="text-white text-xl font-orbitron"
                    to="/register"
                  >
                    Register
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button className="hover:opacity-80">
                  <Link
                    className="text-white text-xl font-orbitron"
                    to="/collection"
                  >
                    Collection
                  </Link>
                </Button>
                <Button className="hover:opacity-80">
                  <Link className="text-white text-xl font-orbitron" to="/deck">
                    Decks
                  </Link>
                </Button>
              </>
            )}
          </div>

          {user && (
            <div>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
                className="text-white text-xl hover:opacity-80 mb-2 font-orbitron"
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;
