import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { TasksInterface, TaskStatus } from "./Interfaces";
import Main from "./modules/Main/Index";
import { colors } from "colors";

require("moment/locale/ru");

const TASKS: TasksInterface[] = [
  {
    id: 0,
    title: "Купить молоко",
    desc: "Купить молоко, потому что оно закончилось, СРОЧНО!!!",
    date: moment("20200209", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.finished
  },
  {
    id: 1,
    title: "Съесть бутерброд",
    desc: "Съесть бутерброд перед школой.",
    date: moment("20200202", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 2,
    title: "Сходить в школу",
    desc: "Сначала в школу, а потом сразу домой.",
    date: moment("20200202", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 3,
    title: "убрать гараж",
    desc: "Вынести старые вещи из гаража, освободить место, для машины.",
    date: moment("20200209", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.canceled
  },
  {
    id: 4,
    title: "Нарисовать картину",
    desc: "Необходимо сделать домашнее задание в художественную школу.",
    date: moment("20200215", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.active
  },
  {
    id: 5,
    title: "Вынести мусор",
    desc: "Не забыть!!! А то весь дом провонял...",
    date: moment("20200213", "YYYYMMDD"),
    createdDate: moment(),
    status: TaskStatus.active
  }
];

function reducer(
  tasksState: TasksInterface[],
  updater: { action: "update" | "addNew"; newState: TasksInterface }
) {
  console.log(tasksState);
  if (updater.action === "update") {
    const currentId = updater.newState.id;
    tasksState[currentId] = updater.newState;
    return tasksState;
  }
  return [...tasksState, updater.newState];
}

const App = (props: { className?: string }) => {
  const [tasksState, dispatchTaskState] = useReducer(reducer, TASKS);
  const [isChange, setIsChange] = useState(false);
  const sortedByDateTaskArr = [...tasksState].sort((a, b) => a.date.diff(b.date));

  return (
    <div className={props.className}>
      <Main
        sortedTaskArr={sortedByDateTaskArr}
        updateTasksState={(updater: {
          action: "update" | "addNew";
          newState: TasksInterface;
        }) => {
          dispatchTaskState(updater);
          setIsChange(!isChange);
        }}
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

  textarea {
    resize: none;
    width: 55%;
    color: ${colors.dark};
    border: 1px solid ${colors.gray};
    border-radius: 4px;
    padding: 10px;
    background-color: inherit;
    overflow: hidden;
    height: 95px;
    :hover {
      border-color: ${colors.darkGray};
    }
    :focus {
      padding: 9px;
      outline: none;
      border: 2px solid rgb(25, 118, 210);
      box-sizing: border-box;
    }
  }

  input[type="date"] {
    position: relative;
    border: none;
    border-bottom: 1px solid ${colors.gray};
    padding: 18px 0 3px;
    transition: all 0.4s ease;
    background-color: inherit;
    :after {
      position: absolute;
      content: "Выберите дату";
      color: ${colors.gray};
      font-size: 0.63rem;
      left: 0;
      top: 0;
    }
    :hover {
      border-bottom: 2px solid ${colors.darkGray};
      padding-bottom: 2px;
    }
    :focus {
      outline: none;
      padding-bottom: 2px;
      border-bottom: 2px solid rgb(25, 118, 210);
      :after {
        color: rgb(25, 118, 210);
      }
    }
  }
`;
