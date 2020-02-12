import { Moment } from "moment";

export enum TaskStatus {
  active = "active",
  finished = "finish",
  canceled = "canceled"
}
export interface TasksInterface {
  id: number;
  title: string;
  desc: string;
  date: Moment;
  createdDate: Moment;
  status: TaskStatus;
}
