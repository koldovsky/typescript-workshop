"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var dom_element_1 = require('./dom-element');
var Task = (function () {
    function Task(priority, title) {
        this.priority = priority;
        this.title = title;
    }
    Task.prototype.toString = function () {
        return "Priority: " + this.priority + ", Title: " + this.title;
    };
    __decorate([
        dom_element_1.default('li')
    ], Task.prototype, "toString", null);
    return Task;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task;
var HighPriorityTask = (function (_super) {
    __extends(HighPriorityTask, _super);
    function HighPriorityTask() {
        _super.apply(this, arguments);
    }
    HighPriorityTask.prototype.toString = function () {
        return _super.prototype.toString.call(this);
    };
    __decorate([
        dom_element_1.default('strong')
    ], HighPriorityTask.prototype, "toString", null);
    return HighPriorityTask;
}(Task));
exports.HighPriorityTask = HighPriorityTask;
//# sourceMappingURL=tasks.js.map