import React, { useEffect, useRef, useState } from "react";
import { TaskInterface, TaskStatus } from "../../../Interfaces";
import styled from "styled-components";
import Actions from "./Actions";
import { colors } from "colors";
import Typography, { TypographyVariant } from "primitives/Typography";
import TaskEditor from "./TaskEditor";
import { Moment } from "moment";

interface ExtendedTasksInterface extends TaskInterface {
  className?: string;
  editTask: (id: number, title: string, desc: string, date: Moment) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number, newStatus: TaskStatus) => void;
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
    toggleTask
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(title + "\n" + desc);
  const [editDateValue, setEditDateValue] = useState(date);
  const defaultTaskState = {
    id: id,
    title: title,
    desc: desc,
    date: date
  };
  const taskState = useRef(defaultTaskState);
  const cancelChanges = () => {
    editTask(
      defaultTaskState.id,
      defaultTaskState.title,
      defaultTaskState.desc,
      defaultTaskState.date
    );
    setEditValue(title + "\n" + desc);
    setEditDateValue(date);
  };
  const saveChanges = () => {
    editTask(
      taskState.current.id,
      taskState.current.title,
      taskState.current.desc,
      taskState.current.date
    );
  };

  useEffect(() => {
    if (!isEdit) {
      return;
    }
    const text = editValue.split(/\n/);
    taskState.current = {
      id: id,
      title: text[0],
      desc: text.slice(1).join(""),
      date: editDateValue
    };
  }, [editValue, editDateValue]);

  return (
    <div className={className}>
      {isEdit ? (
        <TaskEditor
          value={editValue}
          dateValue={editDateValue}
          setValue={setEditValue}
          setDateValue={setEditDateValue}
          saveChanges={saveChanges}
          cancelChanges={cancelChanges}
          editor={() => setIsEdit(!isEdit)}
        />
      ) : (
        <>
          <div>
            <Typography variant={TypographyVariant.subtitle}>
              {title}
            </Typography>
            <Typography variant={TypographyVariant.body}>{desc}</Typography>
            <Typography variant={TypographyVariant.caption}>
              {"Дата создания:  " + createdDate.format("D MMMM YYYY")}
            </Typography>
          </div>
          <Actions
            status={status}
            toggleTask={(newStatus: TaskStatus) =>
              toggleTask(defaultTaskState.id, newStatus)
            }
            deleteTask={() => deleteTask(id)}
            editor={() => setIsEdit(!isEdit)}
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
