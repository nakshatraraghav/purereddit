import { atom } from "jotai";
import { Timestamp } from "firebase/firestore";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageUrl?: string;
}

interface CommunityState {
  communitySnippets: {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string;
  }[];
}

const defaultState: CommunityState = {
  communitySnippets: [],
};

export const communityState = atom<CommunityState>(defaultState);
