"use strict";
var $ = require('jquery');
var task_factory_1 = require('./task-factory');
var tasks = [];
$('#btn-add').click(function (e) {
    e.preventDefault();
    var task = task_factory_1.default.getTask(Number($('#task-priority').val()), $('#task-title').val());
    tasks.push(task);
    var domString = '';
    tasks.forEach(function (t) { return domString += t; });
    $('#task-list').html(domString);
});
//# sourceMappingURL=index.js.map