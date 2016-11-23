# Step 04 - Decorators

## Preparation

At this step we will add decorators to our project

From TypeScript documentation:

> A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

Also please note:

> Decorators are an experimental feature that may change in future releases. <br> To enable experimental support for decorators, you must enable the **experimentalDecorators** compiler option either on the command line or in your tsconfig.json:

And there is one important thing to know - by default TypeScript produces output JavaScript files according to `ES3`
standard but some decorator features require `ES5`, so we need to add line in `tsconfig.json` file to enable `ES5` mode. 
Also we will `experimentalDecorators` flag.

If we try to use decorators without enabling them first we will receive compiler error:
> error TS1219: Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option to remove this warning. 

So, let's make modifications, our `tsconfig.json` will look like:

```json
{
    "compilerOptions": {
        "sourceMap": true,
        "watch": true,
        "noEmitOnError": true,
        "experimentalDecorators": true,
        "target": "es5"
    },
    "files": [
        "index.ts"
    ]
}
```

## Creating decorator

We will create decorator for method named `DOMElement`, it will be parameterized decorator that
accepts element name as parameter and wraps return value of a method into it.

So code for the decorator will look like:

`index.ts`:

```typescript
...
function DOMElement(value: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const oldMethod = target[propertyKey];
        descriptor.value = function(...args: any[]){
            return `<${value}>${oldMethod.apply(this, args)}</${value}>`;
        }
        return descriptor;
    }
}
...
```

We will apply decorator to method `.toString()` in our classes, also we will remove manual creation
of elements in the code. 

This is how decorated method will look like:

```typescript
    @DOMElement('li')
    toString(): string {
        return `Priority: ${this.priority}, Title: ${this.title}`;
    }
```
As you can see, we removed generated elements from method, now this work is done by decorator

So our final `index.ts` will look like this:

```typescript
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
```
