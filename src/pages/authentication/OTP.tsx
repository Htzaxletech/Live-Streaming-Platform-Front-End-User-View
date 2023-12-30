// OTP.tsx
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import AuthHeader from "./AuthHeader";
// import Logo from "@components/shared/Logo";

interface OTPProps {
  isOpenOTP: boolean;
  setOpenOTP: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTP: React.FC<OTPProps> = ({
  isOpenOTP,
  setOpenOTP,
}) => {
  const [otp, setOtp] = useState("");

  const handleOTP = () => {
    // Close the modal after OTP
    setOpenOTP(false);
  };

  const handleOnClose = () => {
    setOpenOTP(false);
  };

  return (
    <div>
      <Modal isOpen={isOpenOTP} onClose={handleOnClose}>
        <div>
          <AuthHeader title="Join Twitch today" />
          <div className="px-0 pt-6 pb-4">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="otp">
                Enter your OTP code
              </label>
              <Input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <Button
              className="w-full mb-3"
              color="primary"
              type="button"
              onClick={handleOTP}
            >
              Verify
            </Button>
            <Button className="w-full" type="button" onClick={handleOTP}>
              Resend
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OTP;
