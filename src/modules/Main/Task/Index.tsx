import React, { useEffect, useRef, useState } from "react";
import { TasksInterface, TaskStatus } from "../../../Interfaces";
import styled from "styled-components";
import Actions from "./Actions";
import { colors } from "colors";
import Typography, { TypographyVariant } from "primitives/Typography";
import TaskEditor from "./TaskEditor";
import { editTask } from "../../../actions";
import { useStore } from "react-redux";

interface ExtendedTasksInterface extends TasksInterface {
  className?: string;
  editTask: (updatedTask: TasksInterface) => void;
  deleteTask: () => void;
  toggleTask: (task: TasksInterface, newStatus: TaskStatus) => void;
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
    date: date,
    createdDate: createdDate,
    status: status
  };
  const taskState = useRef(defaultTaskState);
  const cancelChanges = () => {
    setEditValue(title + "\n" + desc);
    setEditDateValue(date);
    editTask(defaultTaskState);
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
      date: editDateValue,
      createdDate: createdDate,
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
          saveChanges={() => editTask(taskState.current)}
          cancelChanges={() => cancelChanges()}
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
              toggleTask(defaultTaskState, newStatus)
            }
            updateTasksState={(newStatus: TaskStatus) =>
              editTask({
                id: id,
                title: title,
                desc: desc,
                date: date,
                createdDate: createdDate,
                status: newStatus
              })
            }
            deleteTask={deleteTask}
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
