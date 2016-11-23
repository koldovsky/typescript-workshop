# Step 02 - Basic Types and OOP

## I. Prepare index.html

For this step we will create ToDo list application, here is the code for `index.html` file:

`index.html`:
````html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TypeScript ToDo</title>
</head>
<body>
    <h1>Ultimate ToDo List</h1>
    <h2>Tasks:</h2>
    <ul id="task-list"></ul>
    <h3>New task:</h3>
    <form>
        <label for="task-priority">Priority:</label>
        <input type="text" id="task-priority">
        <label for="task-title">Title:</label>
        <input type="text" id="task-title">
        <button id="btn-add">Add</button>
    </form>
    <script src="index.js"></script>
</body>
</html>
````
## II. Create index.ts
Let's create code on in `index.ts` to handle adding tasks to the list and showing them: 

````typescript
let tasks = [];
document.getElementById('btn-add').addEventListener('click', e => {
    e.preventDefault();
    const priority = document.getElementById('task-priority')['value']; 
    const title = document.getElementById('task-title')['value'];
    tasks.push({
        priority: priority,
        title: title
    });
    let domString = '';
    tasks.forEach(t => {
        domString += `<li>Priority: ${t.priority}, Title: ${t.title}, Completed: ${t.completed}</li>`;
    });
    document.getElementById('task-list').innerHTML = domString;
});
````

## III. Add types
Actually, the code above is written in EcmaScript 2015, we didn't use anything specific for TypeScript
in it, so let`s add types to values received from HTML inputs: 

````typescript
let tasks = [];
document.getElementById('btn-add').addEventListener('click', e => {
    e.preventDefault();
    const priority: number = Number(document.getElementById('task-priority')['value']); 
    const title: string = String(document.getElementById('task-title')['value']);
    tasks.push({
        priority: priority,
        title: title
    });
    let domString = '';
    tasks.forEach(t => {
        domString += `<li>Priority: ${t.priority}, Title: ${t.title}</li>`;
    });
    document.getElementById('task-list').innerHTML = domString;
});
````
## IV. Create interface
Interface helps us to ensure that array contains now exact data types that are expected. 
Let's create interface `Task`. 

`index.ts`:

````typescript
interface Task {
    priority: number,
    title: string
}

let tasks: Task[] = [];
document.getElementById('btn-add').addEventListener('click', e => {
    e.preventDefault();
    const priority: number = Number(document.getElementById('task-priority')['value']); 
    const title: string = String(document.getElementById('task-title')['value']);
    tasks.push({
        priority: priority,
        title: title
    });
    let domString = '';
    tasks.forEach(t => {
        domString += `<li>Priority: ${t.priority}, Title: ${t.title}</li>`;
    });
    document.getElementById('task-list').innerHTML = domString;
});
````

## V. Convert interface to a class 
Let's convert interface to class, it gives us more control on the each task:

```typescript
class Task {
    private priority: number;
    private title: string;
    private completed: boolean;
    constructor(priority: number, title: string, completed: boolean) {
        this.priority = priority;
        this.title = title;
        this.completed = completed;
    }
    toString(): string {
        return `Priority: ${this.priority}, Title: ${this.title}, Completed: ${this.completed}`;         
    }
}

let tasks: Task[] = [];
document.getElementById('btn-add').addEventListener('click', e => {
    e.preventDefault();
    const task = new Task(Number(document.getElementById('task-priority')['value']), 
                          String(document.getElementById('task-title')['value']),
                          Boolean(document.getElementById('task-completed')['checked']));
    tasks.push(task);
    let domString = '';
    tasks.forEach(t => {
        domString += `<li>${t.toString()}</li>`;
    });
    document.getElementById('task-list').innerHTML = domString;
});
```
## VI. Implement inheritance 
Let's see how inheritance works in TypeScript. We will create class HighPriorityTask for tasks with priority 
equal to 1 and also create factory that will produce right Task for us using static method:

```typescript
class Task {
    private priority: number;
    private title: string;
    private completed: boolean;
    constructor(priority: number, title: string, completed: boolean) {
        this.priority = priority;
        this.title = title;
        this.completed = completed;
    }
    toString(): string {
        return `Priority: ${this.priority}, Title: ${this.title}, Completed: ${this.completed}`;         
    }
}

class HighPriorityTask extends Task {
    toString(): string {
        return `<strong>${super.toString()}</strong>`
    }
}

class TaskFactory {
    static getTask(priority: number, title: string, completed: boolean): Task {
        if (priority === 1) {
            return new HighPriorityTask(priority, title, completed);
        } else {
            return new Task(priority, title, completed);
        }
    } 
}

let tasks: Task[] = [];
document.getElementById('btn-add').addEventListener('click', e => {
    e.preventDefault();
    const task = TaskFactory.getTask(Number(document.getElementById('task-priority')['value']), 
                          String(document.getElementById('task-title')['value']),
                          Boolean(document.getElementById('task-completed')['checked']));
    tasks.push(task);
    let domString = '';
    tasks.forEach(t => {
        domString += `<li>${t.toString()}</li>`;
    });
    document.getElementById('task-list').innerHTML = domString;
});
```


