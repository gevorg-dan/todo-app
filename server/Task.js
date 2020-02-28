const { TempTask } = require("./TempTask");

module.exports.Task = class Task extends TempTask {
  constructor({ id, title, desc }) {
    super({ title, desc });
    this.id = id;
  }
};
