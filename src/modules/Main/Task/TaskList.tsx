import React from "react";
import styled from "styled-components";

import Task from "./Index";

import { TaskInterface } from "Interfaces";
import {DeleteTaskActionType, EditTaskActionType, ToggleTaskActionType} from "../../../state/main/actions";

function TaskList(props: {
  className?: string;
  taskArr: TaskInterface[];
  editTask: (payload: EditTaskActionType) => void;
  deleteTask: (payload: DeleteTaskActionType) => void;
  toggleTaskStatus: (payload: ToggleTaskActionType) => void;
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
            deleteTask={() => deleteTask({id})}
            toggleTaskStatus={newStatus => toggleTaskStatus({id, newStatus})}
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
