import React from "react";
import styled from "styled-components";
import moment from "moment";

import Typography, { TypographyVariant } from "primitives/Typography";

import Stepper from "components/Stepper";
import TaskList from "./Task/TaskList";

import {
  dateFormat,
  DeleteTaskActionType,
  UpdateTaskActionType
} from "state/main/requests";
import { TaskInterface, TaskStatus } from "Interfaces";

const statusLabelMap = {
  [TaskStatus.active]: "запланированных",
  [TaskStatus.finished]: "выполненных",
  [TaskStatus.canceled]: "отмененных"
};

function GroupedTasksList(props: {
  className?: string;
  status: TaskStatus;
  deleteLoading: boolean;
  updateLoading: boolean;
  groupedTasksByStatus: Record<
    TaskStatus,
    { tasks: TaskInterface[]; dateId: string }[]
  >;
  updateTask: (payload: UpdateTaskActionType) => void;
  deleteTask: (payload: DeleteTaskActionType) => void;
}) {
  const {
    className,
    status,
    deleteLoading,
    updateLoading,
    groupedTasksByStatus,
    updateTask,
    deleteTask
  } = props;

  return (
    <div className={className}>
      <Typography variant={TypographyVariant.subtitle} className="status-title">
        {status}
      </Typography>
      {groupedTasksByStatus[status].map(({ dateId, tasks }, index) => {
        const currentDate = moment(dateId, dateFormat);
        const taskCount = tasks.length;
        const label = `На ${currentDate.format(dateFormat)} количество ${
          statusLabelMap[status]
        } дел: ${taskCount}`;

        return (
          <Stepper key={index} date={currentDate} tooltipLabel={label}>
            <TaskList
              taskArr={tasks}
              deleteLoading={deleteLoading}
              updateLoading={updateLoading}
              updateTask={updateTask}
              deleteTask={deleteTask}
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
