import * as $ from 'jquery';
import Task from './tasks';
import TaskFactory from './task-factory';

let tasks: Task[] = [];
$('#btn-add').click(function (e) {
    e.preventDefault();
    const task = TaskFactory.getTask(Number($('#task-priority').val()), $('#task-title').val());
    tasks.push(task);
    let domString = '';
    tasks.forEach(t => domString += t);
    $('#task-list').html(domString);
});


