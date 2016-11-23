# Step 05 - Modules

At this step we will continue refactoring our application, we will use TypeScript modules to organise our project and make it maintainable.

One important note about terminology from [official TypeScript documentation](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html):
> It’s important to note that in TypeScript 1.5, the nomenclature has changed. “Internal modules” are now “namespaces”. “External modules” are now simply “modules”, as to align with ECMAScript 2015’s terminology, (namely that module X { is equivalent to the now-preferred namespace X {).

Also please consider note from [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/content/docs/project/namespaces.html):
> For most projects we recommend using external modules and using namespace for quick demos and porting old JavaScript code.

So we won't use namespace for this WorkShop and go to modules.

## I. Creating folders, installing jQuery and modifying `tsconfig.json`

We start with creating two folders:
- `src` - will contain source files in TypeScript;
- `dist` - compiled JavaScript files will go here.

Also instead of CDN we will install jQuery as npm package.
This console command will install jQuery 2.x into node_modules folder:

``` 
npm install --save jquery@2
```

Next, we will make modifications in `tsconfig.json` file. We will remove `files` section and replace
it with `include`, also we add two options to include jQuery into project - `baseUrl` and `paths` at last 
we will add option `outDir` and specify where to output compiled files.

Our `tsconfig.json` will look like this:

```json
{
    "compilerOptions": {
        "sourceMap": true,
        "watch": true,
        "noEmitOnError": true,
        "experimentalDecorators": true,
        "target": "es5",
        "baseUrl": ".", // This must be specified if "paths" is.
        "paths": {
            "jquery": ["node_modules/jquery/dist/jquery"]
        },
        "outDir": "./dist/"
    },
    "include": [
        "./src/*.ts"
    ]    
}
```

## II. Split `index.ts` into mutiple files

Then we will split our `index.ts` into several files and put them into `src` folder.

First, extract function `DOMElement` and place it into file `dom-element.ts`:

`src/dom-element.ts`:

```typescript
export default function DOMElement(value: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const oldMethod = target[propertyKey];
        descriptor.value = function(...args: any[]){
            return `<${value}>${oldMethod.apply(this, args)}</${value}>`;
        }
        return descriptor;
    }
}
```

As you can see, we added `export default` before function name to tell compiler that we export it as 
default component of the module.

Next, we will extract classes `Task` and `HighPriorityTask` into file `tasks.ts`:

`src/tasks.ts`:

```typescript
import DOMElement from './dom-element';

export default class Task {
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

export class HighPriorityTask extends Task {
    @DOMElement('strong')
    toString(): string {
        return super.toString();
    }
}
```

Please note that we we added `import` statement at the top of the file to tell that we are importing `DOMElement`.

Also we will place our `TaskFactory` into file `task-factory.ts` and also use `import` to tell that we rely on 
`Task` and `HighPriorityTask`:

`src/task-factory.ts`:

```typescript
import {default as Task, HighPriorityTask} from './tasks';

export default class TaskFactory {
    static getTask(priority: number, title: string): Task {
        if (priority === 1) {
            return new HighPriorityTask(priority, title);
        } else {
            return new Task(priority, title);
        }
    }
}
```

At last we will move our `index.ts` file into `src` folder and place imports on top of it, please note that we changed
how we are adding jQuery to the project - instead of triple-slash directive we use `import` statement:

`src/index.ts`:

```typescript
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
```

## III. Add `SystemJS` module loader

After making all modifications to our file structure we restart TypeScript compiler and will receive compiled
JavaScript files in `dist` folder. To use them on our `html` page we could add multiple `<script>` tags
but there is another option to do it right way - use module loader.

We will use [SystemJS](https://github.com/systemjs/systemjs) module loader.

To install it we will execute following command:

```
npm install --save systemjs
```

Then in our `index.html` file instead of single `<script>` tag referencing `index.js` we will add reference to SystemJS and configure it to run our project:

Our `index.html` will look like:

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
    <script src="node_modules\systemjs\dist\system-polyfills.js"></script>
    <script src="node_modules\systemjs\dist\system.js"></script>
    <script>
        SystemJS.config({
            baseURL: '.',
            defaultJSExtensions: true,
            map: {
                jquery: 'node_modules/jquery/dist/jquery.js'
            }
        });
        SystemJS.import('dist/index.js');
    </script>
</body>
</html>
```



