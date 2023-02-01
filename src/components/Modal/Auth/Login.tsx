import Link from "next/link";
import { FormEvent, useState } from "react";

import { authModalState } from "@/atoms/authModal";
import { useAtom } from "jotai";

import { auth } from "@/firebase/app";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { setRequestMeta } from "next/dist/server/request-meta";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<string>("");
  const [modalState, setModalState] = useAtom(authModalState);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (error) {
      setFormError("");
      return;
    }
    if (!email || email.length === 0 || !password || password.length === 0) {
      setFormError("Please enter valid email or password");
      return;
    }
    signInWithEmailAndPassword(email, password).then(() => {
      alert("succesfully logged in");
      alert(user?.user.email);
    });
  };

  return (
    <form className="px-8 pt-2 pb-8 mb-4 w-full">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="username">
          E-Mail
        </label>
        <input
          className="shadow bg-slate-100 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight hover:border-blue-500 focus:outline-none"
          value={email}
          type="text"
          required
          placeholder="email"
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow bg-slate-100 appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight hover:border-blue-500 focus:outline-none"
          name="password"
          type="password"
          value={password}
          required
          placeholder="******************"
          onChange={(evt) => {
            setPassword(evt.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-between">
        <button className="button" type="button" onClick={onSubmit}>
          Log In
        </button>
        <Link
          className="inline-block ml-auto align-baseline text-sm text-black hover:text-stone-700"
          href="#"
        >
          Forgot Password?
        </Link>
      </div>
      {formError || error?.message ? (
        <p>{formError || error?.message}</p>
      ) : null}
      <p className="mt-6">
        new to pureddit?{" "}
        <span
          className="text-blue-500 hover:text-blue-800 transition-none duration-300 cursor-pointer"
          onClick={() => {
            setModalState({
              ...modalState,
              view: "signup",
            });
          }}
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default Login;
