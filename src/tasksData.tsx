import moment from "moment";

import { TaskInterface, TaskStatus } from "./Interfaces";

require("moment/locale/ru");

export const TASKS: TaskInterface[] = [
  {
    id: 0,
    title: "Купить молоко",
    desc: "Купить молоко, потому что оно закончилось, СРОЧНО!!!",
    date: moment("09022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.finished
  },
  {
    id: 1,
    title: "Съесть бутерброд",
    desc: "Съесть бутерброд перед школой.",
    date: moment("02022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 2,
    title: "Сходить в школу",
    desc: "Сначала в школу, а потом сразу домой.",
    date: moment("18022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 3,
    title: "убрать гараж",
    desc: "Вынести старые вещи из гаража, освободить место, для машины.",
    date: moment("09022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.canceled
  },
  {
    id: 4,
    title: "Нарисовать картину",
    desc: "Необходимо сделать домашнее задание в художественную школу.",
    date: moment("15022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 5,
    title: "Вынести мусор",
    desc: "Не забыть!!! А то весь дом провонял...",
    date: moment("13022020", "DD.MM.YYYY"),
    createdDate: moment(),
    status: TaskStatus.active
  }
];
