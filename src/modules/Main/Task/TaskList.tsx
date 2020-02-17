import React from "react";
import { TasksInterface, TaskStatus } from "Interfaces";
import Task from "./Index";
import styled from "styled-components";
import { editTask } from "../../../actions";

function TaskList(props: {
  taskArr: TasksInterface[];
  editTask: (updatedTask: TasksInterface) => void;
  deleteTask: (id: number) => void;
  toggleTask: (task: TasksInterface, newStatus: TaskStatus) => void;
  className?: string;
}) {
  const { taskArr, className, editTask, deleteTask, toggleTask } = props;
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
            editTask={editTask}
            deleteTask={() => deleteTask(id)}
            toggleTask={toggleTask}
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
