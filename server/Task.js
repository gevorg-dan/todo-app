const { TempTask } = require("./TempTask");

module.exports.Task = class Task extends TempTask {
    constructor({ id, title, desc, date, createdDate, status}) {
        super({ title, desc, date });
        this.id = id;
        this.createdDate = createdDate;
        this.status = status;
    }
};
