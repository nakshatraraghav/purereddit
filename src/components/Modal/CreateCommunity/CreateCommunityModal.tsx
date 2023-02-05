import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useState } from "react";

import { CreateCommunityModalState } from "@/atoms/createCommunityModal";
import { useAtom } from "jotai";

import { modalAnimations } from "@/headlessAnimations/Modal";

import { Inter } from "@next/font/google";

import { auth } from "@/firebase/app";

import { useAuthState } from "react-firebase-hooks/auth";

import { CommunityModalIcons } from "@/assets/icons";
import { firestore } from "@/firebase/app";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const inter = Inter({
  weight: "variable",
});

export default function MyModal() {
  const [communityName, setCommunityName] = useState<string>("");
  const [modalState, setModalState] = useAtom(CreateCommunityModalState);
  const [characterRemaining, setCharactersRemaining] = useState<number>(21);
  const [communityType, setCommunityType] = useState<string>("Public");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [user, loadingUser, userError] = useAuthState(auth);
  if (userError) {
    alert(userError.message);
  }

  function closeModal() {
    setModalState({
      open: false,
    });
  }

  function onCommunityTypeChange(evt: ChangeEvent<HTMLInputElement>) {
    setCommunityType(evt.target.name);
  }

  const handleCommunityCreation = async () => {
    // check for community name length
    if (communityName.length <= 3) {
      setError("Community Name Must be greater than 3 Characters");
      return;
    }
    //TODO:
    // check for valid community name without special characters

    // check whether that name is taken or not
    // if not then create the community

    // creating a reference to a document with id: communityName in communities collection
    // inside the firestore db, here the firestore is the actual db
    // we can have multiple dbs so to specify which db to look inside of we use this
    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);
      const communityDoc = await getDoc(communityDocRef);

      if (communityDoc.exists()) {
        throw new Error(`r/${communityName} already exists, try another name`);
      }

      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });

      closeModal();
    } catch (error: any) {
      setError(error.message);
    }

    setLoading(false);
    return;
  };

  return (
    <Transition appear show={modalState.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child {...modalAnimations.open}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child {...modalAnimations.close}>
              <Dialog.Panel
                className={`max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${inter.className}`}
              >
                <Dialog.Title
                  as="h3"
                  className="text-xl font-extrabold leading-6 text-gray-900"
                >
                  Create a Community
                </Dialog.Title>
                <div className="mt-2">
                  <div className="text-lg font-semibold">Name</div>
                  <div className="text-sm text-gray-500">
                    Communitiy names including capitalization cannot be changed
                  </div>
                  <div className="relative w-[20px] z-10 top-[31px] left-[16px] text-gray-500">
                    r/
                  </div>
                  <input
                    type="text"
                    name="community-name"
                    className="relative z-0 block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={communityName}
                    onChange={(evt) => {
                      if (evt.target.value.length === 0) {
                        setError("");
                      }
                      if (evt.target.value.length > 21) {
                        return;
                      }
                      setCommunityName(evt.target.value);
                      setCharactersRemaining(21 - evt.target.value.length);
                    }}
                  />
                  <div
                    className={`mt-2 text-sm text-gray-600 ${
                      characterRemaining <= 0 ? "text-red-500" : ""
                    }`}
                  >
                    Characters Remaining : {characterRemaining}
                  </div>
                  {error && (
                    <div className="text-sm text-red-500 font-bold">
                      {error}
                    </div>
                  )}
                </div>
                <div className="mt-2   ">
                  <div className="font-semibold">Community Type</div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        name="Public"
                        onChange={onCommunityTypeChange}
                        checked={communityType === "Public"}
                        className="rounded-xl"
                      />
                      <div className="flex justify-between items-center space-x-2">
                        <div>
                          <CommunityModalIcons.public />
                        </div>
                        <div>Public</div>

                        <p className="text-sm text-gray-500">
                          Anyone can view, post and to comment in this community
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ">
                      <input
                        type="checkbox"
                        name="Restricted"
                        onChange={onCommunityTypeChange}
                        checked={communityType === "Restricted"}
                        className="rounded-xl"
                      />
                      <div className="flex justify-between items-center space-x-2">
                        <div>
                          <CommunityModalIcons.restricted />
                        </div>
                        <div>Restricted</div>
                        <p className="text-sm text-gray-500">
                          Anyone can view, but only approved users can post
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ">
                      <input
                        type="checkbox"
                        name="Private"
                        onChange={onCommunityTypeChange}
                        checked={communityType === "Private"}
                        className="rounded-xl"
                      />
                      <div className="flex justify-between items-center space-x-2">
                        <div>
                          <CommunityModalIcons.private />
                        </div>
                        <div>Private</div>
                        <p className="text-sm text-gray-500">
                          Only approved users can view and post
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center disabled:opacity-50 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    disabled={loading}
                    onClick={handleCommunityCreation}
                  >
                    Create Community
                  </button>
                  <button
                    className="button disabled:opacity-50"
                    disabled={loading}
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
