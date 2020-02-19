import React, { useMemo } from "react";
import styled from "styled-components";
import { TaskInterface, TaskStatus } from "../../Interfaces";
import AddTask from "./Task/AddTask";
import Typography, { TypographyVariant } from "primitives/Typography";
import moment, { Moment } from "moment";
import GroupedTasksList from "./GroupedTasksList";
import index from "../../reducers";

function Main(props: {
  sortedTaskArr: TaskInterface[];
  className?: string;
  addNewTask: (title: string, desc: string, date: Moment) => void;
  editTask: (id: number, title: string, desc: string, date: Moment) => void;
  toggleTask: (id: number, newStatus: TaskStatus) => void;
  deleteTask: (id: number) => void;
}) {
  const {
    sortedTaskArr,
    className,
    addNewTask,
    editTask,
    deleteTask,
    toggleTask
  } = props;

  const getGroupedTaskByStatus = useMemo((): Record<
    TaskStatus,
    { tasks: TaskInterface[]; date: string }[]
  > => {
    function getTaskByStatus(
      status: TaskStatus
    ): { tasks: TaskInterface[]; date: string }[] {
      return Object.entries(groupedTaskByStatus[status])
        .map(el => {
          return { date: el[0], tasks: el[1] };
        })
        .sort((a, b) =>
          moment(a.date, "DDMMYYYY").diff(moment(b.date, "DDMMYYYY"))
        );
    }

    const groupedTaskByStatus: Record<
      TaskStatus,
      Record<string, TaskInterface[]>
    > = {
      [TaskStatus.active]: {},
      [TaskStatus.finished]: {},
      [TaskStatus.canceled]: {}
    };
    sortedTaskArr.forEach(task => {
      const dateString = task.date.format("DDMMYYYY");
      const datesByStatus = groupedTaskByStatus[task.status];
      datesByStatus[dateString] = [...(datesByStatus[dateString] || []), task];
    });

    return {
      [TaskStatus.active]: getTaskByStatus(TaskStatus.active),
      [TaskStatus.finished]: getTaskByStatus(TaskStatus.finished),
      [TaskStatus.canceled]: getTaskByStatus(TaskStatus.canceled)
    };
  }, [sortedTaskArr]);

  return (
    <div className={className}>
      <Typography variant={TypographyVariant.title}>Список дел</Typography>
      {Object.values(TaskStatus).map((status, index) => {
        if (getGroupedTaskByStatus[status].length === 0) {
          return null;
        }
        return (
          <GroupedTasksList
            key={index}
            status={status}
            groupedTasksByStatus={getGroupedTaskByStatus}
            editTask={editTask}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        );
      })}
      <AddTask addNewTask={addNewTask} />
    </div>
  );
}

export default styled(Main)`
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  background-color: white;
`;
