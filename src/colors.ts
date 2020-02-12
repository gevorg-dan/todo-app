import { TaskStatus } from "./Interfaces";

export const colors: ColorsInterface = {
  transparent: "#0000",
  black: "#0f1c2d",
  dark: "#283142",
  darkGray: "#5B657C",
  gray: "#8F97B0",
  lightGray: "#dfe1ed",
  white: "#F5F4F9",
  body: "#f5f5f5",
  red: "#F84E4E",
  [TaskStatus.canceled]: "#F84E4E33",
  yellow: "#FFDA55",
  green: "#2DCC70",
  [TaskStatus.finished]: "#2DCC7044",
  [TaskStatus.active]: "#fbfaff",
  w: "#FFF",
  b: "#000"
};

interface ColorsInterface {
  transparent: string;
  black: string;
  dark: string;
  darkGray: string;
  gray: string;
  body: string;
  lightGray: string;
  white: string;
  red: string;
  [TaskStatus.canceled]: string;
  yellow: string;
  green: string;
  [TaskStatus.finished]: string;
  [TaskStatus.active]: string;
  w: string;
  b: string;
}
