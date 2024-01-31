import React from "react";
import LogoImage from "@assets/images/logo.svg";

interface AuthHeaderProps {
  title: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <img src={LogoImage} alt="logo" width={40} />
      <h1 className="text-xl font-semibold text-center">{title}</h1>
    </div>
  );
};

export default AuthHeader;