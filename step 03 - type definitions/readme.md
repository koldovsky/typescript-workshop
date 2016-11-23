# Step 03 - Using type definitions

Let's add jQuery to our project.

## Add jQuery to HTML
We will use jQuery CDN to 

Add this line to index.html just before link to index.js: 

from `index.html`:
```html
...
<script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
...
```
## Create `package.json`
Then we will create `package.json` file with this command:

in `console`:
````
npm init
````
provide URL-friendly name like `ultimate-task-list`

## Install *jQuery typings* and add reference

We need to install type definition file for jQuery:

in `console`:

````
npm install --save-dev @types/jquery
````

Add reference path to reference library at the beginning of the `index.ts`:

`index.ts`:
```
 /// <reference path="node_modules/@types/jquery/index.d.ts"/>
 ...
```

## Refactor code
Next we will refactor code with jQuery:

`index.ts`:

````typescript
/// <reference path="node_modules/@types/jquery/index.d.ts"/>
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
$('#btn-add').click(function(e) {
    e.preventDefault();
    const task = TaskFactory.getTask($('#task-priority').val(), 
                          $('#task-title').val());
    tasks.push(task);
    let domString = '';
    tasks.forEach(t => {
        domString += `<li>${t.toString()}</li>`;
    });
    $('#task-list').html(domString);
});
````

## Fix the bug with correct data type

But there is a bug here: if you type value for priority field equal to *1* it won't work the right way, 
this task won't be marked as high priority.

According to [jQuery documentation](http://api.jquery.com/val/) this method should return String, Number or Array 
and it returns String in our case that is the cause of the bug:  
> **`.val()`**<br>
> Get the current value of the first element in the set of matched elements or set the value of every matched element.<br>
> `.val()` - Returns: String or Number or Array

Why TypeScript didn't warn us of possible type mismatch? That's because in current version of type definition 
library result of jQuery .val() method has been declared as type `any`:

from `@types/jquery/index.d.ts`:

```typescript
/**
* Get the current value of the first element in the set of matched elements.
*/
val(): any;
```

Type `any` is very special - anything can be assigned to variable of this type as well as vice versa. 
So in our case TypeScript didn't do anything wrong - it sees type `any` and believes that we know what we do.

In this case we need either *fix type definition file* or *do type conversion*.

TypeScript supports type conversions called *type assertions*.

There two kind of syntax for type assertions *bracket notation* and *as syntax*, they produce same results:

````typescript
let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;
````

The issue is that this kind of type conversion occurs only at compile time, it actually doesn't do
anything at run time:

> Type assertions are a way to tell the compiler “trust me, I know what I’m doing.” A type assertion is like a type cast in other languages, but performs no special checking or restructuring of data. It has no runtime impact, and is used purely by the compiler. TypeScript assumes that you, the programmer, have performed any special checks that you need.

So to do actual conversion we need to do it JavaScript-style:

`index.ts`:

```typescript
...
const task = TaskFactory.getTask(Number($('#task-priority').val()), $('#task-title').val());
...                       
```                    

## Final code

Our final code for this task will look like:

`index.ts`:

```typescript
/// <reference path="node_modules/@types/jquery/index.d.ts"/>
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
$('#btn-add').click(function(e) {
    e.preventDefault();
    const task = TaskFactory.getTask(Number($('#task-priority').val()), $('#task-title').val());
    tasks.push(task);
    let domString = '';
    tasks.forEach(t => {
        domString += `<li>${t.toString()}</li>`;
    });
    $('#task-list').html(domString);
});
```

`index.html`:

```html
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
    <script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="index.js"></script>
</body>
</html>
```
