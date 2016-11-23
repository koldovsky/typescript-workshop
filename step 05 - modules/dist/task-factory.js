"use strict";
var tasks_1 = require('./tasks');
var TaskFactory = (function () {
    function TaskFactory() {
    }
    TaskFactory.getTask = function (priority, title) {
        if (priority === 1) {
            return new tasks_1.HighPriorityTask(priority, title);
        }
        else {
            return new tasks_1.default(priority, title);
        }
    };
    return TaskFactory;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TaskFactory;
//# sourceMappingURL=task-factory.js.map