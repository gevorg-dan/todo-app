const { Task } = require("./Task");

const idGenerator = () => +new Date();

const getCurrentDate = () => {
  const currentDate = new Date();
  const result = [
    currentDate.getDate(),
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  ];
  return result.join(".");
};

module.exports.TaskController = class TaskController {
  store = null;

  setStore(store) {
    this.store = store;
  }

  getTasks() {
    return this.store.tasks;
  }

  createTask(tempTask) {
    const id = idGenerator();
    const createdDate = getCurrentDate();
    const newTask = new Task({
      ...tempTask,
      id,
      createdDate,
      status: "active"
    });

    this.store.push(newTask);

    return { id };
  }

  removeTask(id) {
    const removeIndex = this.store.tasks.findIndex(
      storeTask => storeTask.id === id
    );
    this.store.removeByIndex(removeIndex);
  }

  updateTask(propsToUpdate) {
    const updateIndex = this.store.tasks.findIndex(
      storeTask => storeTask.id === propsToUpdate.id
    );

    this.store.updateByIndex(updateIndex, propsToUpdate);
  }
};
