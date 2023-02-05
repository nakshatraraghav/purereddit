import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect } from "react";

import { authModalState } from "@/atoms/authModal";
import { useAtom } from "jotai";
import AuthInputs from "./AuthInputs";

import { auth } from "@/firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

import { Inter } from "@next/font/google";

import { modalAnimations } from "@/headlessAnimations/Modal";

const inter = Inter({
  weight: "variable",
});

export const AuthModal: FC = () => {
  const [modalState, setModalState] = useAtom(authModalState);

  function toggleModalState() {
    setModalState({
      view: modalState.view,
      open: !modalState.open,
    });
  }

  const [user, loading, error] = useAuthState(auth);
  // initially the user is set to null and the loading is true
  // once user has been authenticated the value changes
  // so what we want to do is that when the value changes from null to something
  // we want to close the modal

  useEffect(() => {
    if (user) {
      setModalState({
        view: modalState.view,
        open: false,
      });
      console.log("user", user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Fragment>
      <Transition appear show={modalState.open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModalState}>
          <Transition.Child {...modalAnimations.open}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child {...modalAnimations.close}>
                <Dialog.Panel className="w-[600px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div
                    className={`flex-col items-center justify-center ${inter.className}`}
                  >
                    <AuthInputs />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};
