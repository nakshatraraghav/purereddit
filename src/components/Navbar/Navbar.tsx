import { auth } from "@/firebase/app";
import Image from "next/image";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { AuthModal } from "../Modal/Auth/AuthModal";
import CommunityDropdown from "./CommunityDropdown/CommunityDropdown";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <nav className="h-14 p-4 flex items-center space-x-4 bg-white">
      <div className="flex space-x-2">
        <Image
          src={"/images/redditFace.svg"}
          height="30"
          width={30}
          alt="reddit logo"
        />
        <h1 className="hidden text-xl md:flex">pureddit</h1>
      </div>
      <CommunityDropdown />
      <SearchInput />
      <RightContent user={user} />
      <AuthModal />
    </nav>
  );
};

export default Navbar;
