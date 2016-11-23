/// <reference path="node_modules/@types/jquery/index.d.ts"/>

function DOMElement(value: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const oldMethod = target[propertyKey];
        descriptor.value = function(...args: any[]){
            return `<${value}>${oldMethod.apply(this, args)}</${value}>`;
        }
        return descriptor;
    }
}

class Task {
    private priority: number;
    private title: string;
    constructor(priority: number, title: string) {
        this.priority = priority;
        this.title = title;
    }

    @DOMElement('li')
    toString(): string {
        return `Priority: ${this.priority}, Title: ${this.title}`;
    }
}

class HighPriorityTask extends Task {
    @DOMElement('strong')
    toString(): string {
        return super.toString();
    }
}

class TaskFactory {
    static getTask(priority: number, title: string): Task {
        if (priority === 1) {
            return new HighPriorityTask(priority, title);
        } else {
            return new Task(priority, title);
        }
    }
}

let tasks: Task[] = [];
$('#btn-add').click(function (e) {
    e.preventDefault();
    const task = TaskFactory.getTask(Number($('#task-priority').val()), $('#task-title').val());
    tasks.push(task);
    let domString = '';
    tasks.forEach(t => domString += t);
    $('#task-list').html(domString);
});


