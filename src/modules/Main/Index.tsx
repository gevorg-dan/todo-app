import React, { useMemo } from "react";
import styled from "styled-components";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";

import Typography, { TypographyVariant } from "primitives/Typography";

import AddTask from "./Task/AddTask";
import GroupedTasksList from "./GroupedTasksList";

import {
  CreateTaskActionType,
  DeleteTaskActionType,
  UpdateTaskActionType
} from "state/main/requests";

import { TaskInterface, TaskStatus } from "Interfaces";

type GroupedTasksType = Record<TaskStatus, Record<string, TaskInterface[]>>;
type GroupedTasksByStatusType = Record<
  TaskStatus,
  { tasks: TaskInterface[]; dateId: string }[]
>;

const getTaskByStatus = (
  groupedTasks: GroupedTasksType,
  status: TaskStatus
): { tasks: TaskInterface[]; dateId: string }[] => {
  return Object.entries(groupedTasks[status])
    .map(el => {
      return { dateId: el[0], tasks: el[1] };
    })
    .sort((a, b) =>
      moment(a.dateId, "DDMMYYYY").diff(moment(b.dateId, "DDMMYYYY"))
    );
};

const getGroupedTasksByStatus = (
  tasks: TaskInterface[]
): GroupedTasksByStatusType => {
  const groupedTasksByStatus: GroupedTasksType = {
    [TaskStatus.active]: {},
    [TaskStatus.finished]: {},
    [TaskStatus.canceled]: {}
  };
  tasks.forEach(task => {
    const dateString = task.date.format("DDMMYYYY");
    const linkOnDatesByStatus = groupedTasksByStatus[task.status];
    linkOnDatesByStatus[dateString] = [
      ...(linkOnDatesByStatus[dateString] || []),
      task
    ];
  });

  return {
    [TaskStatus.active]: getTaskByStatus(
      groupedTasksByStatus,
      TaskStatus.active
    ),
    [TaskStatus.finished]: getTaskByStatus(
      groupedTasksByStatus,
      TaskStatus.finished
    ),
    [TaskStatus.canceled]: getTaskByStatus(
      groupedTasksByStatus,
      TaskStatus.canceled
    )
  };
};

function Main(props: {
  className?: string;
  tasks: TaskInterface[];
  tasksLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  updateLoading: boolean;
  createTask: (payload: CreateTaskActionType) => void;
  updateTask: (payload: UpdateTaskActionType) => void;
  deleteTask: (payload: DeleteTaskActionType) => void;
}) {
  const {
    className,
    tasks,
    tasksLoading,
    createLoading,
    deleteLoading,
    updateLoading,
    updateTask,
    deleteTask,
    createTask
  } = props;
  const GroupedTasksByStatusMemo = useMemo(
    () => getGroupedTasksByStatus(tasks),
    [tasks]
  );
  return (
    <div className={className}>
      {tasksLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant={TypographyVariant.title}>Список дел</Typography>
          {Object.values(TaskStatus).map((status, index) => {
            if (GroupedTasksByStatusMemo[status].length === 0) {
              return null;
            }
            return (
              <GroupedTasksList
                key={index}
                status={status}
                deleteLoading={deleteLoading}
                updateLoading={updateLoading}
                groupedTasksByStatus={GroupedTasksByStatusMemo}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            );
          })}
          <AddTask createLoading={createLoading} createTask={createTask} />
        </>
      )}
    </div>
  );
}

export default styled(Main)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-radius: 5px;
  box-shadow: ${({ tasksLoading }) =>
    tasksLoading
      ? "none"
      : "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"};
  background-color: ${({ tasksLoading }) =>
    tasksLoading ? "inherit" : "white"};
`;
