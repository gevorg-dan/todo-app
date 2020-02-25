import React from "react";
import styled from "styled-components";
import { Moment } from "moment";

import Task from "./Index";

import { TaskInterface, TaskStatus } from "Interfaces";

function TaskList(props: {
  className?: string;
  taskArr: TaskInterface[];
  editTask: (id: number, title: string, desc: string, date: Moment) => void;
  deleteTask: (id: number) => void;
  toggleTaskStatus: (id: number, newStatus: TaskStatus) => void;
}) {
  const { className, taskArr, editTask, deleteTask, toggleTaskStatus } = props;
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
            toggleTaskStatus={newStatus => toggleTaskStatus(id, newStatus)}
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
