import React from "react";
import styled from "styled-components";
import {TasksInterface, TaskStatus} from "../../Interfaces";
import AddTask from "./Task/AddTask";
import Task from "./Task/Index";
import Typography, { TypographyVariant } from "primitives/Typography";

function TaskList(props: { tasks: TasksInterface[] , updateTasksState: (update: TasksInterface) => void;}) {
  return (
    <div>
      {props.tasks.map(({ id, title, desc, date, status }, index) => {
        return (
          <Task
            id={id}
            key={id}
            title={title}
            desc={desc}
            date={date}
            status={status}
            updateTasksState={(newStatus: TaskStatus) => props.updateTasksState({id: id,
                title: title,
                desc: desc,
                date: date,
                status: newStatus,})}
          />
        );
      })}
    </div>
  );
}

function Main(props: {
  taskState: TasksInterface[];
  className?: string;
    updateTasksState: (update: TasksInterface) => void;
}) {
  const { taskState, className, updateTasksState } = props;
  return (
    <div className={className}>
      <Typography variant={TypographyVariant.title}>Список дел</Typography>
      <TaskList tasks={taskState} updateTasksState={updateTasksState} />
      <AddTask addNewTask={updateTasksState} />
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
