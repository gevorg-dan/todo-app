import { Moment } from "moment";

export enum TaskStatus {
  active = "Активные",
  finished = "Выполненные",
  canceled = "Отмененные"
}

export interface TaskInterface {
  id: number;
  title: string;
  desc: string;
  date: Moment;
  createdDate: Moment;
  status: TaskStatus;
}
