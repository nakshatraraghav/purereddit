import React from "react";

import MenuItem from "../RightContent/DropdownMenu/MenuItem";

import { useAtom } from "jotai";
import {
  CreateCommunityModalState,
  createCommunityModalState,
} from "@/atoms/createCommunityModal";

const Communities = () => {
  const [modalState, setModalState] = useAtom(CreateCommunityModalState);
  return (
    <MenuItem>
      <div
        onClick={() => {
          setModalState({
            open: !modalState.open,
          });
        }}
      >
        Create a Community
      </div>
    </MenuItem>
  );
};

export default Communities;
