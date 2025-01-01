import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useAuth } from "./context/useAuth";

const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const res = await axios.post(
    "http://localhost:3000/auth/login",
    credentials,
    {
      withCredentials: true,
    }
  );
  return res;
};

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.data.user);
      console.log(data.data.user);
      setMessage("Successfully Logged In!");
      navigate({ to: "/" });
    },
    onError: (error) => {
      setMessage(error.response?.data?.error || "Login Failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-20">
      <form
        className="w-full max-w-sm p-6 bg-transparent rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-2xl font-semibold text-center mb-4">
          Login
        </h2>
        <div className="mb-4 text-white">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            error={mutation.isError && !username}
            helperText={
              mutation.isError && !username ? "Username is required" : ""
            }
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={mutation.isError && !password}
            helperText={
              mutation.isError && !password ? "Password is required" : ""
            }
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
        </div>
        {mutation.isError && (
          <p className="text-red-500 text-sm mb-4">
            {message || mutation.error?.message || "Login failed"}
          </p>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={mutation.status === "pending"}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          {mutation.status === "pending" ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
