import React, { useMemo } from "react";
import styled from "styled-components";
import { TasksInterface, TaskStatus } from "../../Interfaces";
import AddTask from "./Task/AddTask";
import Typography, { TypographyVariant } from "primitives/Typography";
import Stepper from "../../components/Stepper";
import TaskList from "./Task/TaskList";
import moment from "moment";

function Main(props: {
  sortedTaskArr: TasksInterface[];
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

  function tasksBoard(status: TaskStatus) {
    return groupedTaskByStatus[status].map(({ date, tasks }) => {
      if (status !== TaskStatus.active) {
        return (
          <TaskList
            key={date}
            taskArr={tasks}
            updateTasksState={updateTasksState}
          />
        );
      }
      const currentDate = moment(date, "DDMMYYYY");
      const taskCount = tasks.length;
      const label = `На ${currentDate.format(
        "DD.MM.YYYY"
      )} количество запланированных дел: ${taskCount}`;
      return (
        <Stepper key={date} date={currentDate} tooltipLabel={label}>
          <TaskList taskArr={tasks} updateTasksState={updateTasksState} />
        </Stepper>
      );
    });
  }

  return (
    <div className={className}>
      <Typography variant={TypographyVariant.title}>Список дел</Typography>
      {tasksBoard(TaskStatus.active)}
      {tasksBoard(TaskStatus.finished)}
      {tasksBoard(TaskStatus.canceled)}
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
