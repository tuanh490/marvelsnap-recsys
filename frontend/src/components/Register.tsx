import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";

const registerUser = async (credentials: {
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await axios.post(
    "http://localhost:3000/auth/register",
    credentials,
    {
      withCredentials: true,
    }
  );
  return res;
};

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setMessage("Successfully Registered!");
      navigate({ to: "/login" });
    },
    onError: (error) => {
      console.error(error);
      setMessage(error.response.data.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    mutation.mutate({ username, password, confirmPassword });
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-20">
      <form
        className="w-full max-w-sm p-6 bg-gray-100 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-black text-2xl font-semibold text-center mb-4">
          Register
        </h2>
        <div className="mb-4">
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
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={mutation.isError && !confirmPassword}
            helperText={
              mutation.isError && !confirmPassword
                ? "Confirm password is required"
                : ""
            }
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-sm mb-4">{passwordError}</p>
        )}
        {mutation.isError && (
          <p className="text-red-500 text-sm mb-4">
            {message || mutation.error?.message || "Registration failed"}
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
          {mutation.status === "pending" ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
