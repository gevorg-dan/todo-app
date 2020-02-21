import React, { useEffect, useRef, useState } from "react";
import { TaskInterface, TaskStatus } from "../../../Interfaces";
import styled from "styled-components";
import Actions from "./Actions";
import { colors } from "colors";
import Typography, { TypographyVariant } from "primitives/Typography";
import TaskEditor from "./TaskEditor";
import { Moment } from "moment";
import useBoolean from "../../../ownHooks/useBoolean";

interface ExtendedTasksInterface extends TaskInterface {
  className?: string;
  editTask: (id: number, title: string, desc: string, date: Moment) => void;
  deleteTask: () => void;
  toggleTaskStatus: (newStatus: TaskStatus) => void;
}

function Task(props: ExtendedTasksInterface) {
  const {
    id,
    title,
    desc,
    date,
    createdDate,
    status,
    className,
    editTask,
    deleteTask,
    toggleTaskStatus
  } = props;
  const [editValue, setEditValue] = useState(() => title + "\n" + desc);
  const [isEditing, enableEdit, disableEdit] = useBoolean(false);
  const [editDateValue, setEditDateValue] = useState(date);
  const defaultTaskState = { id, title, desc, date };
  const taskState = useRef(defaultTaskState);

  const deleteTaskHandler = () => deleteTask();
  const cancelChangesHandler = () => {
    const { id, title, desc, date } = defaultTaskState;
    editTask(id, title, desc, date);
    setEditValue(title + "\n" + desc);
    setEditDateValue(date);
  };
  const saveChangesHandler = () => {
    const { id, title, desc, date } = taskState.current;
    editTask(id, title, desc, date);
  };

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    const text = editValue.split(/\n/);
    taskState.current = {
      id,
      title: text[0],
      desc: text.slice(1).join(""),
      date: editDateValue
    };
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
            <Typography>{desc}</Typography>
            <Typography variant={TypographyVariant.caption}>
              {"Дата создания:  " + createdDate.format("D MMMM YYYY")}
            </Typography>
          </div>
          <Actions
            status={status}
            toggleTask={(newStatus: TaskStatus) => toggleTaskStatus(newStatus)}
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
  background-color: ${props => colors[props.status]};
  width: 100%;

  p {
    position: relative;
    line-height: 1.43;
    letter-spacing: 0.01071em;
    text-decoration: ${props =>
      props.status === TaskStatus.active ? "none" : "line-through"};
    text-indent: ${props =>
      props.status === TaskStatus.active ? "0" : "20px"};
  }
`;
