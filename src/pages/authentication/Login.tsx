// Login.tsx
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";

const Login: React.FC = ({ isLoginOpen, setLoginOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Logging in with:", { username, password });
    // Close the modal after login
    setLoginOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)}>
        <div>
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Login to Twitch
          </h1>
          <div className="px-0 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Button
                className="w-full"
                color="primary"
                type="button"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <Button
              onClick={() => alert("hi")}
              className="w-full bg-transparent text-primary-500 dark:hover:text-slate-100 hover:text-black text-sm"
            >
              Don't have an account? Sign Up
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
