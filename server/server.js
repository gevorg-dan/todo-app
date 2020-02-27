const express = require("express");
const bodyParser = require("body-parser");

const { TasksStore } = require("./TasksStore");
const { TaskController } = require("./TaskController");
const { ApplyServer } = require("./ApplyServer");

const app = express();
const port = 3000;

const store = new TasksStore();
const taskController = new TaskController();
const applyServer = new ApplyServer(app);

taskController.setStore(store);
applyServer.setTaskController(taskController);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

applyServer.makeDelay(1000);
applyServer.makeGetTasks("/");
applyServer.makeCreateTask("/add");
applyServer.makeRemoveTask("/remove");
applyServer.makeUpdateTask("/update");

app.listen(port, err => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server is listening: ${port}`);
});
