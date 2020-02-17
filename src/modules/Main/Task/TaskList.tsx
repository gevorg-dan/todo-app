import React from "react";
import { TasksInterface } from "Interfaces";
import Task from "./Index";
import styled from "styled-components";

function TaskList(props: {
  taskArr: TasksInterface[];
  updateTask: (updatedTask: TasksInterface) => void;
  deleteTask: (deletedTask: TasksInterface) => void;
  className?: string;
}) {
  const { taskArr, className, updateTask, deleteTask } = props;
  return (
    <div className={className}>
      {taskArr.map(({ id, title, desc, date, createdDate, status }) => {
        return (
          <Task
            key={id}
            id={id}
            title={title}
            desc={desc}
            date={date}
            createdDate={createdDate}
            status={status}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
}

export default styled(TaskList)`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
