import Image from "next/image";
import { FC } from "react";

import { AuthModal } from "../Modal/Auth/AuthModal";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: FC = () => {
  return (
    <nav className="h-14 p-4 flex items-center space-x-4">
      <div className="flex space-x-2">
        <Image
          src={"/images/redditFace.svg"}
          height="30"
          width={30}
          alt="reddit logo"
        />
        <h1 className="hidden text-xl md:flex">pureddit</h1>
      </div>
      <SearchInput />
      <RightContent />
      <AuthModal />
    </nav>
  );
};

export default Navbar;
