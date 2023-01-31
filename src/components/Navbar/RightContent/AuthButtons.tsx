import { useAtom } from "jotai";
import { authModalState } from "@/atoms/authModal";

const AuthButtons = () => {
  const [modalState, setModalState] = useAtom(authModalState);

  return (
    <div className="space-x-2">
      {/* basically these buttons would trigger the modal to open and close */}
      <button
        className="button rounded-xl bg-slate-200 text-black hover:bg-black hover:text-white"
        onClick={() => {
          setModalState({
            view: "signup",
            open: !modalState.open,
          });
        }}
      >
        Sign Up
      </button>
      <button
        className="button"
        onClick={() => {
          setModalState({
            view: "login",
            open: !modalState.open,
          });
        }}
      >
        {" "}
        Log In
      </button>
    </div>
  );
};

export default AuthButtons;
