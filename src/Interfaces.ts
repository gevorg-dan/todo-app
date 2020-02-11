import { Moment } from "moment";
export enum TaskStatus {
  active,
  finished,
  canceled
}
export interface TasksInterface {
  id: string;
  title: string;
  desc: string;
  date: string;
  status: TaskStatus;
}
