import React, { useEffect, useRef, useState } from "react";
import { TasksInterface, TaskStatus } from "../../../Interfaces";
import styled from "styled-components";
import Actions from "./Actions";
import closeIcon from "./close.svg";
import { colors } from "colors";
import Typography, { TypographyVariant } from "primitives/Typography";
import TaskEditor from "./TaskEditor";

interface ExtendedTasksInterface extends TasksInterface {
  className?: string;
  updateTasksState: (newTaskState: {
    action: "update" | "addNew";
    newState: TasksInterface;
  }) => void;
}

function Task(props: ExtendedTasksInterface) {
  const { id, title, desc, date, status, className, updateTasksState } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(title + "\n" + desc);
  const [editDateValue, setEditDateValue] = useState(date);
  const taskState = useRef({
    id: id,
    title: title,
    desc: desc,
    date: date,
    status: TaskStatus.active
  });

  useEffect(() => {
    if (!isEdit) {
      return;
    }
    const text = editValue.split(/\n/);
    taskState.current = {
      id: id,
      title: text[0],
      desc: text.slice(1).join(""),
      date: editDateValue,
      status: status
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
          saveChanges={() =>
            updateTasksState({ action: "update", newState: taskState.current })
          }
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
              {"Дата создания:  " + date.format("D MMMM YYYY")}
            </Typography>
          </div>
          <Actions
            status={status}
            updateTasksState={(newStatus: TaskStatus) =>
              updateTasksState({
                action: "update",
                newState: {
                  id: id,
                  title: title,
                  desc: desc,
                  date: date,
                  status: newStatus
                }
              })
            }
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

  ${props => {
    if (
      props.status === TaskStatus.finished ||
      props.status === TaskStatus.canceled
    ) {
      return `
    p {
    :before {
      position: absolute;
      width: 12px;
      height: 6px;
      border-bottom: 4px solid #4dcc6a;
      border-left: 4px solid #4dcc6a;
      content: "";
      top: calc(19px / 2 - 7px);
      left: calc(20px / 2 - 9px);
      transform: rotate(-55deg);
      background: none;
      border-radius: 3px;
    }
  }`;
    }
  }}

  ${props => {
    if (props.status === TaskStatus.canceled) {
      return `
    p:before {
      width: 15px;
      height: 15px;
      left: calc(20px / 2 - 10px);
      transform: none;
      border: none;
      background-size: 5%;
      background: url(${closeIcon}) no-repeat center / cover;
      border-radius: 2px;`;
    }
  }}
`;
