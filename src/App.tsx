import React, { useReducer, useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import { TasksInterface, TaskStatus } from "./Interfaces";
import Main from "./modules/Main/Index";
import Header from "./modules/Header/Index";
import { colors } from "colors";
import { SelectDates, SelectStatus } from "./primitives/Select";

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
    date: moment("20200218", "YYYYMMDD"),
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

function filterByDate(tasksArr: TasksInterface[], filterValue: SelectDates) {
  const dateFilterFunctionTable = {
    [SelectDates.today](taskDate: Moment) {
      return taskDate.isBetween(moment().subtract(1, "day"), moment());
    },
    [SelectDates.tomorrow](taskDate: Moment) {
      return taskDate.isBetween(moment(), moment().add(1, "days"));
    },
    [SelectDates.week](taskDate: Moment) {
      return taskDate.isBetween(
        moment().subtract(1, "day"),
        moment().add(7, "days"),
        "days"
      );
    },
    [SelectDates.nextWeek](taskDate: Moment) {
      return taskDate.isBetween(
        moment().add(6, "days"),
        moment().add(2, "week"),
        "days"
      );
    },
    [SelectDates.month](taskDate: Moment) {
      return taskDate.isBetween(
        moment().subtract(1, "day"),
        moment()
          .add(1, "month")
          .add(1, "day"),
        "days"
      );
    },
    [SelectDates.nextMonth](taskDate: Moment) {
      return taskDate.isBetween(
        moment()
          .add(1, "month")
          .subtract(1, "day"),
        moment()
          .add(2, "month")
          .add(1, "day"),
        "days"
      );
    },
    [SelectDates.all](taskDate: Moment) {
      return true;
    }
  };

  return tasksArr.filter(task => {
    if (dateFilterFunctionTable[filterValue](task.date)) {
      return task;
    }
  });
}

function reducer(
  tasksState: TasksInterface[],
  updater: { action: "update" | "addNew" | "delete"; newState: TasksInterface }
) {
  const { action, newState } = updater;

  if (action === "update") {
    return tasksState.map(task => {
      if (task.id !== newState.id) {
        return task;
      }
      return newState;
    });
  }

  if (action === "delete") {
    return tasksState.filter(task => {
      if (task.id !== newState.id) {
        return task;
      }
    });
  }

  return [...tasksState, newState];
}

function App(props: { className?: string }) {
  const [tasksState, dispatchTaskState] = useReducer(reducer, TASKS);
  const [nextTaskId, setNextTaskId] = useState(TASKS.length);
  const [isChange, setIsChange] = useState(false);
  const [selectedDate, setSelectedDate] = useState(SelectDates.all);
  const [selectedStatus, setSelectedStatus] = useState(SelectStatus.active);
  const sortedByDateTaskArr = [...tasksState].sort((a, b) =>
    a.date.diff(b.date)
  );

  // TODO
  const filteredTasksByStatus: TasksInterface[] = sortedByDateTaskArr.filter(
    task => {
      const statusFilterTable = {
        [SelectStatus.active]: TaskStatus.active,
        [SelectStatus.finished]: TaskStatus.finished,
        [SelectStatus.canceled]: TaskStatus.canceled,
        [SelectStatus.all]: task.status
      };

      if (task.status === statusFilterTable[selectedStatus]) {
        return task;
      }
    }
  );

  const filteredTasksByDate: TasksInterface[] = filterByDate(
    filteredTasksByStatus,
    selectedDate
  );

  return (
    <div className={props.className}>
      <Header
        selectedDate={selectedDate}
        setSelectedDate={(newDate: SelectDates) => setSelectedDate(newDate)}
        selectedStatus={selectedStatus}
        setSelectedStatus={(newStatus: SelectStatus) =>
          setSelectedStatus(newStatus)
        }
      />
      <Main
        nextTaskId={nextTaskId}
        setNextTaskId={() => setNextTaskId(nextTaskId + 1)}
        sortedTaskArr={filteredTasksByDate}
        addNewTask={(newTask: TasksInterface) => {
          dispatchTaskState({ action: "addNew", newState: newTask });
          setIsChange(!isChange);
        }}
        updateTask={(updatedTask: TasksInterface) => {
          dispatchTaskState({ action: "update", newState: updatedTask });
          setIsChange(!isChange);
        }}
        deleteTask={(deletedTask: TasksInterface) => {
          dispatchTaskState({ action: "delete", newState: deletedTask });
          setIsChange(!isChange);
        }}
      />
    </div>
  );
}

export default styled(App)`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px 150px;

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
