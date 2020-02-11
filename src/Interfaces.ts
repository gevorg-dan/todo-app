import { Moment } from "moment";
export enum TaskStatus {
  active,
  finished,
  canceled
}
export interface TasksInterface {
  id: number;
  title: string;
  desc: string;
  date: Moment;
  status: TaskStatus;
}
