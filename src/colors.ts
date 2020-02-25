import { TaskStatus } from "./Interfaces";

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
  yellow: string;
  green: string;
  w: string;
  b: string;
}

interface TaskStatusColorsInterface {
  [TaskStatus.canceled]: string;
  [TaskStatus.finished]: string;
  [TaskStatus.active]: string;
}

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
  yellow: "#FFDA55",
  green: "#2DCC70",
  w: "#FFF",
  b: "#000"
};

export const TaskStatusColors: TaskStatusColorsInterface = {
  [TaskStatus.canceled]: "rgba(248,78,78,0.11)",
  [TaskStatus.finished]: "rgba(45,204,112,0.11)",
  [TaskStatus.active]: "#fbfaff"
}