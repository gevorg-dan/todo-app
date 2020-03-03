import React from "react";
import styled from "styled-components";

import Task from "./Index";

import {
  DeleteTaskActionType,
  UpdateTaskActionType
} from "state/main/requests";
import { TaskInterface } from "Interfaces";

function TaskList(props: {
  className?: string;
  taskArr: TaskInterface[];
  deleteLoading: boolean;
  updateLoading: boolean;
  updateTask: (payload: UpdateTaskActionType) => void;
  deleteTask: (payload: DeleteTaskActionType) => void;
}) {
  const {
    className,
    updateLoading,
    deleteLoading,
    taskArr,
    updateTask,
    deleteTask
  } = props;

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
            updateLoading={updateLoading}
            deleteLoading={deleteLoading}
            createdDate={createdDate}
            status={status}
            updateTask={propsToUpdate => {
              return updateTask({ id, ...propsToUpdate });
            }}
            deleteTask={() => deleteTask({ id })}
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
