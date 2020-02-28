const idGenerator = () => +new Date();

module.exports.TaskController = class TaskController {
  store = null;

  setStore(store) {
    this.store = store;
  }

  getTasks() {
    return this.store;
  }

  createTask(tempTask) {
    const id = idGenerator();
    const newTask = { ...tempTask, id };

    this.store.push(newTask);

    return { id };
  }

  removeTask(id) {
    const removeIndex = this.store.tasks.findIndex(
      storeTask => storeTask.id === id
    );
    this.store.removeByIndex(removeIndex);
  }

  updateTask(id, propsToUpdate) {
    const removeIndex = this.store.tasks.findIndex(
      storeTask => storeTask.id === id
    );

    this.store.updateByIndex(removeIndex, propsToUpdate);
  }
};
