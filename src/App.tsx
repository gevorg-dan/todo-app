import React, { useReducer } from "react";
import styled from "styled-components";
import moment from "moment";
import { TasksInterface, TaskStatus } from "./Interfaces";
import Main from "./modules/Main/Index";
import Typography, { TypographyVariant } from "./primitives/Typography";

require("moment/locale/ru");

const TASKS: TasksInterface[] = [
  {
    id: "0",
    title: "Купить молоко",
    desc: "Купить молоко, потому что оно закончилось, СРОЧНО!!!",
    date: moment("20200209", "YYYYMMDD").format("D MMMM YYYY"),
    status: TaskStatus.finished
  },
  {
    id: "1",
    title: "Съесть бутерброд",
    desc: "Съесть бутерброд перед школой.",
    date: moment("20200202", "YYYYMMDD").format("D MMMM YYYY"),
    status: TaskStatus.active
  },
  {
    id: "2",
    title: "Сходить в школу",
    desc: "Сначала в школу, а потом сразу домой.",
    date: moment("20200202", "YYYYMMDD").format("D MMMM YYYY"),
    status: TaskStatus.active
  },
  {
    id: "3",
    title: "убрать гараж",
    desc: "Вынести старые вещи из гаража, освободить место, для машины.",
    date: moment("20200209", "YYYYMMDD").format("D MMMM YYYY"),
    status: TaskStatus.canceled
  },
  {
    id: "4",
    title: "Нарисовать картину",
    desc: "Необходимо сделать домашнее задание в художественную школу.",
    date: moment("20200215", "YYYYMMDD").format("D MMMM YYYY"),
    status: TaskStatus.active
  },
  {
    id: "5",
    title: "Вынести мусор",
    desc: "Не забыть!!! А то весь дом провонял...",
    date: moment("20200213", "YYYYMMDD").format("D MMMM YYYY"),
    status: TaskStatus.active
  }
];

function reducer(tasksState: TasksInterface[], update: TasksInterface) {
  const tasksID = tasksState.map(task => task.id);

  if (tasksID.indexOf(update.id) !== -1) {
    return tasksState.map(task => {
      return task.id === update.id ? update : task;
    });
  }

  return [...tasksState, update];
}

const App = (props: { className?: string }) => {
  const [tasksState, dispatchTaskState] = useReducer(reducer, TASKS);
  return (
    <div className={props.className}>
      <Main
        taskState={tasksState}
        updateTasksState={(update: TasksInterface) => dispatchTaskState(update)}
      />
    </div>
  );
};

export default styled(App)`
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 100px 0;
`;
