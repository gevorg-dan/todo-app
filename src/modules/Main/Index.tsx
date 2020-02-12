import React, { useRef } from "react";
import styled from "styled-components";
import { TasksInterface } from "../../Interfaces";
import AddTask from "./Task/AddTask";
import Task from "./Task/Index";
import Typography, { TypographyVariant } from "primitives/Typography";
import Stepper from "../../components/Stepper";

function TaskList(props: {
  tasks: TasksInterface[];
  updateTasksState: (updater: {
    action: "update" | "addNew";
    newState: TasksInterface;
  }) => void;
}) {
  return (
    <div>
      {props.tasks.map(({ id, title, desc, date, status }, index) => {
        return (
          <Task
            key={id}
            id={id}
            title={title}
            desc={desc}
            date={date}
            status={status}
            updateTasksState={(updater: {
              action: "update" | "addNew";
              newState: TasksInterface;
            }) => props.updateTasksState(updater)}
          />
        );
      })}
    </div>
  );
}

function Main(props: {
  tasksState: TasksInterface[];
  className?: string;
  updateTasksState: (updater: {
    action: "update" | "addNew";
    newState: TasksInterface;
  }) => void;
}) {
  const { tasksState, className, updateTasksState } = props;

  return (
    <div className={className}>
      <Typography variant={TypographyVariant.title}>Список дел</Typography>

      <TaskList tasks={tasksState} updateTasksState={updateTasksState} />

      <AddTask nextTaskID={tasksState.length} addNewTask={updateTasksState} />
    </div>
  );
}

export default styled(Main)`
  width: 90%;
  padding: 15px 10px 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  background-color: white;
`;
