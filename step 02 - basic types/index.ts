class Task {
    private priority: number;
    private title: string;
    constructor(priority: number, title: string) {
        this.priority = priority;
        this.title = title;
    }
    toString(): string {
        return `Priority: ${this.priority}, Title: ${this.title}`;         
    }
}

class HighPriorityTask extends Task {
    toString(): string {
        return `<strong>${super.toString()}</strong>`
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
document.getElementById('btn-add').addEventListener('click', e => {
    e.preventDefault();
    const task = TaskFactory.getTask(Number(document.getElementById('task-priority')['value']), 
                          String(document.getElementById('task-title')['value']));
    tasks.push(task);
    let domString = '';
    tasks.forEach(t => {
        domString += `<li>${t.toString()}</li>`;
    });
    document.getElementById('task-list').innerHTML = domString;
});
