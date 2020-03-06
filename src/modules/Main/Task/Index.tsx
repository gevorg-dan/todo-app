import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Moment } from "moment";

import { colors, TaskStatusColors } from "colors";

import Typography, { TypographyVariant } from "primitives/Typography";

import Actions from "./Actions";
import TaskEditor from "./TaskEditor";

import useBoolean from "ownHooks/useBoolean";
import { setTaskTextAndDate } from "./setTaskTextAndDate";

import { dateFormat } from "state/main/requests";
import { TaskInterface, TaskStatus } from "Interfaces";

interface ExtendedTasksInterface extends TaskInterface {
  className?: string;
  deleteLoading: boolean;
  updateLoading: boolean;
  updateTask: (propsToUpdate: {
    title?: string;
    desc?: string;
    date: string;
    status: string;
  }) => void;
  deleteTask: () => void;
}

const taskStatusMap = {
  [TaskStatus.active]: "active",
  [TaskStatus.finished]: "finished",
  [TaskStatus.canceled]: "canceled"
};

function Task(props: ExtendedTasksInterface) {
  const {
    className,
    title,
    desc,
    date,
    updateLoading,
    createdDate,
    status,
    updateTask,
    deleteTask
  } = props;
  const [editValue, setEditValue] = useState(() => title + "\n" + desc);
  const [editDateValue, setEditDateValue] = useState(date);

  const [isEditing, enableEdit, disableEdit] = useBoolean(false);
  const [modalOpened, openModal, closeModal] = useBoolean(false);

  const [editLoader, enableEditLoader, disableEditLoader] = useBoolean(false);
  const [updateLoader, setUpdateLoader] = useBoolean(false);
  const [deleteLoader, setDeleteLoader] = useBoolean(false);

  const taskState = { title, desc, date };

  const cancelChangesHandler = () => {
    setEditValue(() => title + "\n" + desc);
    setEditDateValue(date);
  };
  const saveChangesHandler = () => {
    enableEditLoader();
    const { title, desc, date } = taskState;
    updateTask({
      title,
      desc,
      date: date.format(dateFormat),
      status: taskStatusMap[status]
    });
  };
  const toggleTaskStatusHandler = (status: TaskStatus) => {
    setUpdateLoader();
    updateTask({
      date: date.format(dateFormat),
      status: taskStatusMap[status]
    });
  };
  const deleteTaskHandler = () => {
    setDeleteLoader();
    deleteTask();
  };

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    setTaskTextAndDate(taskState, editValue, editDateValue);
  }, [editValue, editDateValue, isEditing, taskState]);

  useEffect(() => {
    if (!updateLoading) {
      disableEditLoader();
      disableEdit();
    }
  }, [updateLoading]);

  return (
    <div className={className}>
      {isEditing || editLoader ? (
        <TaskEditor
          value={editValue}
          dateValue={editDateValue}
          editLoader={editLoader}
          setValue={setEditValue}
          setDateValue={setEditDateValue}
          saveChanges={saveChangesHandler}
          cancelChanges={cancelChangesHandler}
          disableEdit={disableEdit}
        />
      ) : (
        <>
          <StyledTaskText title={title} desc={desc} createdDate={createdDate} />
          <Actions
            status={status}
            modalOpened={modalOpened}
            updateLoader={updateLoader}
            deleteLoader={deleteLoader}
            openModal={openModal}
            closeModal={closeModal}
            toggleTaskStatus={toggleTaskStatusHandler}
            deleteTask={deleteTaskHandler}
            openEditor={enableEdit}
          />
        </>
      )}
    </div>
  );
}

function TaskText({
  className,
  title,
  desc,
  createdDate
}: {
  className?: string;
  title: string;
  desc: string;
  createdDate: Moment;
}) {
  return (
    <div className={className}>
      <Typography variant={TypographyVariant.subtitle}>{title}</Typography>
      <Typography className="task-description">{desc}</Typography>
      <Typography variant={TypographyVariant.caption}>
        {"Дата создания:  " + createdDate.format("D MMMM YYYY")}
      </Typography>
    </div>
  );
}

const StyledTaskText = styled(TaskText)`
  flex-grow: 1;
`;

export default styled(Task)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 5px;
  color: ${colors.gray};
  background-color: ${props => TaskStatusColors[props.status]};
  width: 100%;
  pointer-events: ${({ updateLoading, deleteLoading }) =>
    updateLoading || deleteLoading ? "none" : "auto"};
  :hover {
    ${Actions} {
      height: 55px;
    }
  }

  .task-description {
    line-height: 1.43;
    letter-spacing: 0.01071em;
    text-decoration: ${props =>
      props.status === TaskStatus.active ? "none" : "line-through"};
    text-indent: ${props =>
      props.status === TaskStatus.active ? "0" : "20px"};
  }
`;
