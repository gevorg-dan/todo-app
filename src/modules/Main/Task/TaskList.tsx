import React from "react";
import { TasksInterface } from "Interfaces";
import Task from "./Index";

function TaskList(props: {
    taskArr: TasksInterface[];
    updateTasksState: (updater: {
        action: "update" | "addNew";
        newState: TasksInterface;
    }) => void;
}) {
    return (
        <div>
            {props.taskArr.map(({ id, title, desc, date,createdDate, status }, index) => {
                return (
                    <Task
                        key={id}
                        id={id}
                        title={title}
                        desc={desc}
                        date={date}
                        createdDate={createdDate}
                        status={status}
                        updateTasksState={(updater: {
                            action: "update" | "addNew";
                            newState: TasksInterface;
                        }) => props.updateTasksState(updater)}
                    />
                );
            })}
        </div>
    );
}

export default TaskList;