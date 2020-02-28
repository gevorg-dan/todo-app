const { tasks } = require("./tasks");

module.exports.TasksStore = class TasksStore {
  tasks = tasks;
  removeByIndex(index) {
    this.tasks = [
      ...this.tasks.slice(0, index),
      ...this.tasks.slice(index + 1)
    ];
  }
  updateByIndex(index, propsToUpdate) {
    this.tasks[index] = { ...this.tasks[index], ...propsToUpdate };
  }
  push(task) {
    this.tasks.push(task);
  }
};
