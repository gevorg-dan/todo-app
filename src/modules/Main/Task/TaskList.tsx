import React from "react";
import { TasksInterface } from "Interfaces";
import Task from "./Index";
import styled from "styled-components";

function TaskList(props: {
  taskArr: TasksInterface[];
  updateTasksState: (updater: {
    action: "update" | "addNew";
    newState: TasksInterface;
  }) => void;
  className?: string;
}) {
  const { taskArr, className, updateTasksState } = props;
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
            updateTasksState={(updater: {
              action: "update" | "addNew";
              newState: TasksInterface;
            }) => updateTasksState(updater)}
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
