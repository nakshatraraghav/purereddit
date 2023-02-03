import { atom } from "jotai";

export interface ThemeModeState {
  mode: "light" | "dark";
}

export const themeModeState = atom<ThemeModeState>({
  mode: "dark",
});
