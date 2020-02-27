const { TempTask } = require("./TempTask");
const { RequestParamsValidator } = require("./RequestParamsValidator");

module.exports.ApplyServer = class ApplyServer extends RequestParamsValidator {
  constructor(app) {
    super();
    this.app = app;
    this.taskController = null;
  }

  makeDelay(delay) {
    this.app.use("*", (req, res, next) => {
      setTimeout(next, delay);
    });
  }

  makeCreateTask(path) {
    this.app.post(path, (req, res) => {
      this.validateFields(
        [
          ["title", "string"],
          ["desc", "string"]
        ],
        req.body
      );
      const tempTask = new TempTask(req.body);
      const { id } = this.taskController.createTask(tempTask);
      res.json({ id });
    });
  }

  makeRemoveTask(path) {
    this.app.post(path, (req, res) => {
      this.validateFields([["id", "number"]], req.body);
      const taskId = req.body.id;
      this.taskController.removeTask(taskId);
      res.end("Success remove");
    });
  }

  makeUpdateTask(path) {
    this.app.post(path, (req, res) => {
      this.validateFields(
        [
          ["id", "number"],
          ["title", "string"],
          ["desc", "string"]
        ],
        req.body
      );
      this.taskController.updateTask(req.body.id, req.body);
      res.end("Success update");
    });
  }

  makeGetTasks(path) {
    this.app.get(path, (req, res) => {
      const tasks = this.taskController.getTasks();
      res.json(tasks);
    });
  }

  setTaskController(taskController) {
    this.taskController = taskController;
  }
};
