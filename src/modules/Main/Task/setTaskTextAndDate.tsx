import { Moment } from "moment";

export function setTaskTextAndDate(
  task: { title: string; desc: string; date: Moment },
  text: string,
  date: Moment
) {
  const textArr = text.split(/\n/);
  task.title = textArr[0];
  task.desc = textArr.slice(1).join("");
  task.date = date;
}
