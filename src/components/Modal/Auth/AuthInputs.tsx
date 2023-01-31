import { FC } from "react";

import { authModalState } from "@/atoms/authModal";
import { useAtom } from "jotai";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthInputs: FC = () => {
  const [modalState] = useAtom(authModalState);
  return (
    <div className="flex items-center w-full mt-4">
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
      {/* {modalState.view === "resetpassword" && <ResetPassword />} */}
    </div>
  );
};

export default AuthInputs;
