// SignUp.tsx
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import AuthHeader from "./AuthHeader";

interface SignUpProps {
  isOpenSignUp: boolean;
  setOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  setSwitchToLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOTP: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({
  isOpenSignUp,
  setOpenSignUp,
  setSwitchToLogin,
  setOpenOTP,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUp = () => {
    // Implement your SignUp logic here
    console.log("Logging in with:", { username, password });
    // Close the modal after SignUp
    setOpenSignUp(false);
    setOpenOTP(true);
  };

  const handleOnClose = () => {
    setOpenSignUp(false);
    setSwitchToLogin(false);
  };

  return (
    <div>
      <Modal isOpen={isOpenSignUp} onClose={handleOnClose}>
        <div>
          <AuthHeader title="Join Twitch today" />
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
            <div className="mb-4">
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
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Button
                className="w-full"
                color="primary"
                type="button"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </div>
            <Button
              onClick={() => setSwitchToLogin(true)}
              className="w-full bg-transparent text-primary-500 dark:hover:text-slate-100 hover:text-black text-sm"
            >
              Already a Twich user? Log In
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;