import React, { useRef } from "react";
import styled from "styled-components";
import { TasksInterface } from "../../Interfaces";
import AddTask from "./Task/AddTask";
import Typography, { TypographyVariant } from "primitives/Typography";
import Stepper from "../../components/Stepper";
import TaskList from "./Task/TaskList";

function Main(props: {
  sortedTaskArr: TasksInterface[];
  className?: string;
  updateTasksState: (updater: {
    action: "update" | "addNew";
    newState: TasksInterface;
  }) => void;
}) {
  const { sortedTaskArr, className, updateTasksState } = props;

  return (
    <div className={className}>
      <Typography variant={TypographyVariant.title}>Список дел</Typography>

      <TaskList taskArr={sortedTaskArr} updateTasksState={updateTasksState} />

      <AddTask nextTaskID={sortedTaskArr.length} addNewTask={updateTasksState} />
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
