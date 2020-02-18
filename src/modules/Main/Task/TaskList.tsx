import React from "react";
import { TaskInterface, TaskStatus } from "Interfaces";
import Task from "./Index";
import styled from "styled-components";
import {Moment} from "moment";

function TaskList(props: {
  taskArr: TaskInterface[];
  editTask: (id: number, title:string, desc: string, date: Moment) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number, newStatus: TaskStatus) => void;
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
            deleteTask={deleteTask}
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
