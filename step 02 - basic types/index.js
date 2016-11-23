var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Task = (function () {
    function Task(priority, title) {
        this.priority = priority;
        this.title = title;
    }
    Task.prototype.toString = function () {
        return "Priority: " + this.priority + ", Title: " + this.title;
    };
    return Task;
}());
var HighPriorityTask = (function (_super) {
    __extends(HighPriorityTask, _super);
    function HighPriorityTask() {
        _super.apply(this, arguments);
    }
    HighPriorityTask.prototype.toString = function () {
        return "<strong>" + _super.prototype.toString.call(this) + "</strong>";
    };
    return HighPriorityTask;
}(Task));
var TaskFactory = (function () {
    function TaskFactory() {
    }
    TaskFactory.getTask = function (priority, title) {
        if (priority === 1) {
            return new HighPriorityTask(priority, title);
        }
        else {
            return new Task(priority, title);
        }
    };
    return TaskFactory;
}());
var tasks = [];
document.getElementById('btn-add').addEventListener('click', function (e) {
    e.preventDefault();
    var task = TaskFactory.getTask(Number(document.getElementById('task-priority')['value']), String(document.getElementById('task-title')['value']));
    tasks.push(task);
    var domString = '';
    tasks.forEach(function (t) {
        domString += "<li>" + t.toString() + "</li>";
    });
    document.getElementById('task-list').innerHTML = domString;
});
//# sourceMappingURL=index.js.map