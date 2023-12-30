// OTP.tsx
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
import QRCode from "react-qr-code";

interface TwoFactorProps {
  isOpenTwoFactor: boolean;
  setOpenTwoFactor: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const TwoFactor: React.FC<TwoFactorProps> = ({
  isOpenTwoFactor,
  setOpenTwoFactor,
  setOpenLogin,
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    setOpenTwoFactor(false);
  };

  const handleBack = () => {
    setOpenTwoFactor(false);
    setOpenLogin(true);
  };

  const handleOnClose = () => {
    setOpenTwoFactor(false);
  };

  return (
    <div>
      <Modal isOpen={isOpenTwoFactor} onClose={handleOnClose}>
        <div>
          <Heading size="md" className="mb-3">Two-Factor Authentication</Heading>
          <div className="px-0 pt-6">
            <div className="mb-6">
              <label className="block text-sm font-bold mb-1" htmlFor="code">
                Step 1: Download an authenticator app
              </label>
              <p className="text-sm">
                Download and install any authenticator app
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-1" htmlFor="code">
                Step 2: Scan the QR code
              </label>
              <p className="text-sm mb-1">
                Open the authenticator app and scan the image below
              </p>
              <div className="flex justify-center mt-5">
                <QRCode
                  value="Something"
                  className="bg-white p-2 w-36 h-auto"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold mb-1" htmlFor="code">
                Step 3: Verify your code
              </label>
              <p className="mb-3">Enter 6 digit code generated</p>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button className="" type="button" onClick={handleBack}>
                Back
              </Button>
              <Button
                className="mb-3"
                color="primary"
                type="button"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TwoFactor;
