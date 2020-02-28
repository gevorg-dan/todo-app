import React from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";

import Typography, { TypographyVariant } from "primitives/Typography";

import Stepper from "components/Stepper";
import TaskList from "./Task/TaskList";

import { TaskInterface, TaskStatus } from "Interfaces";
import {
  AddTaskActionType,
  DeleteTaskActionType,
  EditTaskActionType,
  ToggleTaskActionType
} from "../../state/main/actions";

const statusLabelMap = {
  [TaskStatus.active]: "запланированных",
  [TaskStatus.finished]: "выполненных",
  [TaskStatus.canceled]: "отмененных"
};

function GroupedTasksList(props: {
  className?: string;
  status: TaskStatus;
  groupedTasksByStatus: Record<
    TaskStatus,
    { tasks: TaskInterface[]; dateId: string }[]
    >;
  editTask: (payload: EditTaskActionType) => void;
  deleteTask: (payload: DeleteTaskActionType) => void;
  toggleTaskStatus: (payload: ToggleTaskActionType) => void;
}) {
  const {
    className,
    status,
    groupedTasksByStatus,
    editTask,
    deleteTask,
    toggleTaskStatus
  } = props;

  return (
    <div className={className}>
      <Typography variant={TypographyVariant.subtitle} className="status-title">
        {status}
      </Typography>
      {groupedTasksByStatus[status].map(({ dateId, tasks }) => {
        const currentDate = moment(dateId, "DDMMYYYY");
        const taskCount = tasks.length;
        const label = `На ${currentDate.format("DD.MM.YYYY")} количество ${
          statusLabelMap[status]
        } дел: ${taskCount}`;

        return (
          <Stepper key={dateId} date={currentDate} tooltipLabel={label}>
            <TaskList
              taskArr={tasks}
              editTask={editTask}
              deleteTask={deleteTask}
              toggleTaskStatus={toggleTaskStatus}
            />
          </Stepper>
        );
      })}
    </div>
  );
}

export default styled(GroupedTasksList)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  padding: 0 7%;
  .status-title {
    margin: 20px 0;
  }
`;
