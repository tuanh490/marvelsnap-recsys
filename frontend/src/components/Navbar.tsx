import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@tanstack/react-router";
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" className="bg-gray-900 p-2">
      <Toolbar className="flex justify-between items-center">
        <IconButton edge="start" className="hover:opacity-80">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-20" />
          </Link>
        </IconButton>
        <div className="flex justify-center flex-grow space-x-4 font-semibold">
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
        </div>

        <IconButton className="hover:opacity-80">
          <Link to="/profile">
            <AccountCircleIcon className="text-white text-4xl" />
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
