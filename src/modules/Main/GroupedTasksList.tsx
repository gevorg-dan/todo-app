import React from "react";
import styled from "styled-components";
import Typography, { TypographyVariant } from "primitives/Typography";
import { TasksInterface, TaskStatus } from "../../Interfaces";
import moment from "moment";
import Stepper from "../../components/Stepper";
import TaskList from "./Task/TaskList";

function GroupedTasksList(props: {
  status: TaskStatus;
  groupedTasksByStatus: Record<
    TaskStatus,
    { tasks: TasksInterface[]; date: string }[]
  >;
  updateTask: (updatedTask: TasksInterface) => void;
  className?: string;
}) {
  const { status, className, groupedTasksByStatus, updateTask } = props;
  const statusLabel =
    status === TaskStatus.active
      ? "запланированных"
      : status === TaskStatus.finished
      ? "выполненных"
      : "отмененных";

  return (
    <div className={className}>
      <Typography variant={TypographyVariant.subtitle} className="status-title">
        {status}
      </Typography>
      {groupedTasksByStatus[status].map(({ date, tasks }) => {
        const currentDate = moment(date, "DDMMYYYY");
        const taskCount = tasks.length;
        const label = `На ${currentDate.format(
          "DD.MM.YYYY"
        )} количество ${statusLabel} дел: ${taskCount}`;

        return (
          <Stepper key={date} date={currentDate} tooltipLabel={label}>
            <TaskList taskArr={tasks} updateTask={updateTask} />
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
