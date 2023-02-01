import { FC } from "react";

import AuthButtons from "./AuthButtons";

import { auth } from "@/firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const RightContent: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      {user ? (
        <button
          onClick={() => {
            signOut(auth);
          }}
          className="button"
        >
          {user.email}
        </button>
      ) : (
        <AuthButtons />
      )}
    </div>
  );
};

export default RightContent;
