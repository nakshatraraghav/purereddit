import { FC } from "react";

import AuthButtons from "./AuthButtons";

import { User } from "firebase/auth";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import Icons from "./Icons";

type RightContentProps = {
  user?: User | null;
};

const RightContent: FC<RightContentProps> = ({ user }) => {
  return (
    <div>
      <div className="flex items-center justify-between md:space-x-4">
        {user ? (
          <Icons />
        ) : (
          <div className="hidden md:flex">
            <AuthButtons />
          </div>
        )}
        <DropdownMenu user={user} />
      </div>
    </div>
  );
};

export default RightContent;
