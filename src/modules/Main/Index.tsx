import React, { useMemo } from "react";
import styled from "styled-components";
import { TasksInterface, TaskStatus } from "../../Interfaces";
import AddTask from "./Task/AddTask";
import Typography, { TypographyVariant } from "primitives/Typography";
import Stepper from "../../components/Stepper";
import TaskList from "./Task/TaskList";
import moment from "moment";
import GroupedTasksList from "./GroupedTasksList";
import { SelectStatus } from "../../primitives/Select";

function Main(props: {
  sortedTaskArr: TasksInterface[];
  groupStatus: SelectStatus;
  className?: string;
  updateTasksState: (updater: {
    action: "update" | "addNew";
    newState: TasksInterface;
  }) => void;
}) {
  const { sortedTaskArr, className, updateTasksState } = props;

  const groupedTaskByStatus = useMemo((): Record<
    TaskStatus,
    { tasks: TasksInterface[]; date: string }[]
  > => {
    function getTaskByStatus(
      status: TaskStatus
    ): { tasks: TasksInterface[]; date: string }[] {
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
      Record<string, TasksInterface[]>
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
      <GroupedTasksList
        status={TaskStatus.active}
        groupedTasksByStatus={groupedTaskByStatus}
        updateTasksState={updateTasksState}
      />
      <GroupedTasksList
        status={TaskStatus.finished}
        groupedTasksByStatus={groupedTaskByStatus}
        updateTasksState={updateTasksState}
      />
      <GroupedTasksList
        status={TaskStatus.canceled}
        groupedTasksByStatus={groupedTaskByStatus}
        updateTasksState={updateTasksState}
      />
      <AddTask
        nextTaskID={sortedTaskArr.length}
        addNewTask={updateTasksState}
      />
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
