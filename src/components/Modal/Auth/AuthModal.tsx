import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

import { authModalState } from "@/atoms/authModal";
import { useAtom } from "jotai";
import AuthInputs from "./AuthInputs";

export const AuthModal: FC = () => {
  const [modalState, setModalState] = useAtom(authModalState);

  function toggleModalState() {
    setModalState({
      view: modalState.view,
      open: !modalState.open,
    });
  }

  return (
    <Fragment>
      <Transition appear show={modalState.open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModalState}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[600px] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex-col items-center justify-center">
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
