import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Moment } from "moment";

import { colors, TaskStatusColors } from "colors";

import Typography, { TypographyVariant } from "primitives/Typography";

import Actions from "./Actions";
import TaskEditor from "./TaskEditor";

import useBoolean from "ownHooks/useBoolean";
import { setTaskTextAndDate } from "./setTaskTextAndDate";

import { TaskInterface, TaskStatus } from "Interfaces";

interface ExtendedTasksInterface extends TaskInterface {
  className?: string;
  editTask: (id: number, title: string, desc: string, date: Moment) => void;
  deleteTask: () => void;
  toggleTaskStatus: (newStatus: TaskStatus) => void;
}

function Task(props: ExtendedTasksInterface) {
  const {
    className,
    id,
    title,
    desc,
    date,
    createdDate,
    status,
    editTask,
    deleteTask,
    toggleTaskStatus
  } = props;
  const [editValue, setEditValue] = useState(() => title + "\n" + desc);
  const [isEditing, enableEdit, disableEdit] = useBoolean(false);
  const [editDateValue, setEditDateValue] = useState(date);
  const taskState = { id, title, desc, date };

  const deleteTaskHandler = () => deleteTask();
  const cancelChangesHandler = () => {
    editTask(id, title, desc, date);
    setEditValue(title + "\n" + desc);
    setEditDateValue(date);
  };
  const saveChangesHandler = () => {
    const { title, desc, date } = taskState;
    editTask(id, title, desc, date);
  };

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    setTaskTextAndDate(taskState, editValue, editDateValue);
  }, [editValue, editDateValue]);

  return (
    <div className={className}>
      {isEditing ? (
        <TaskEditor
          value={editValue}
          dateValue={editDateValue}
          setValue={setEditValue}
          setDateValue={setEditDateValue}
          saveChanges={saveChangesHandler}
          cancelChanges={cancelChangesHandler}
          openEditor={disableEdit}
        />
      ) : (
        <>
          <div>
            <Typography variant={TypographyVariant.subtitle}>
              {title}
            </Typography>
            <Typography className="task-description">{desc}</Typography>
            <Typography variant={TypographyVariant.caption}>
              {"Дата создания:  " + createdDate.format("D MMMM YYYY")}
            </Typography>
          </div>
          <Actions
            status={status}
            toggleTaskStatus={(newStatus: TaskStatus) =>
              toggleTaskStatus(newStatus)
            }
            deleteTask={deleteTaskHandler}
            openEditor={enableEdit}
          />
        </>
      )}
    </div>
  );
}

export default styled(Task)`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 5px;
  color: ${colors.gray};
  background-color: ${props => TaskStatusColors[props.status]};
  width: 100%;

  .task-description {
    position: relative;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    text-decoration: ${props =>
      props.status === TaskStatus.active ? "none" : "line-through"};
    text-indent: ${props =>
      props.status === TaskStatus.active ? "0" : "20px"};
  }
`;
