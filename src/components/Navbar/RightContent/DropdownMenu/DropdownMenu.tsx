import { Menu } from "@headlessui/react";

import { User } from "firebase/auth";
import { FC } from "react";
import DropdownMenuItems from "./DropdownMenuItems";

import MenuButton from "./MenuButton";

type DropdownMenuProps = {
  user?: User | null;
};

const DropdownMenu: FC<DropdownMenuProps> = ({ user }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton user={user} />
      <DropdownMenuItems user={user} />
    </Menu>
  );
};

export default DropdownMenu;
