# Intro

This is practice-first introduction into TypeScript 2.0 language brought to you by [programming mentor](http://programmingmentor.com).
Each step continues on files created as result of previous step. For your convenience  

# Step 01 - Prepare environment. Create 'Hello World'. Basic configuration and debugging

## I. Install prerequisites

### 1. Install Node.js
Navigate to [nodejs.org](https://nodejs.org), download and install latest version of Node.JS (7.1.0)  

### 2. Install Visual Studio Code
Navigate to [code.visualstudio.com](https://code.visualstudio.com/), download and install 
latest version of Visual Studio Code (1.7.1)

### 3. Install http-server
````
npm install -g http-server
````

### 3. Install TypeScript
```
npm install -g typescript
```
## II. Create Hello World application

### Create new folder and index.html file

Open folder in Visual Studio Code and create **index.html** file 

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World in TypeScript</title>
</head>
<body>
    <script src="index.js"></script>
</body>
</html>
```
Note that we referenced **index.js** file that should be JavaScript file that we will received by 
compiling TypeScript into it.

### Create index.ts file in TypeScript

`index.ts`:
```typescript
let greetings: string = `Hello World!`;
document.body.innerHTML =  greetings;
```
Note that we written code very similar to JavaScript, the only difference from EcmaScript 2015 is that we
provided data type `string` to the variable.

### Run TypeScript compiler
Go to the terminal (Ctrl-` in Visual Studio Code) and run the following command:

`console command`:

```
tsc index.ts
```
If the code is syntactically correct this command will not produce any output to the screen but will 
generate `index.js` file:

`index.js`:

```javascript
var greetings = "Hello World!";
document.body.innerHTML = greetings;
```
As you can see, data type has been removed and also syntax converted to classical JavaScript because by default 
TypeScript compiler outputs to ES3 standard of the language.

### Run http-server and open web page in a browser

In the terminal run the following command:

```
http-server 
```

It will output addresses and port to connect to the local server:

```
Starting up http-server, serving ./
Available on:
  http://192.168.1.168:8080
  http://192.168.137.1:8080
  http://127.0.0.1:8080
Hit CTRL-C to stop the server
```
Open web browser and navigate to one of the listed addresses, it should print 'Hello World!' on the page.

### Running TypeScript compiler in watch mode

If you want to modify transcript file you have re-run compiler manually but it has an option to watch for
changes, so let's open new terminal window and run it in watching mode:

```
tsc -w index.ts
```

Let's make changes to index.ts and save it:

`index.ts`:

```typescript
var greetings = "Hello World!";
document.body.innerHTML = greetings;
```

TypeScript compiler will output to the console that file changes detected and it starts incremental compilation.
After refreshing browser we will see that the page is updated.

## III. Basic debugging and configuration

If we go to developer tools in browser and look at source code we will see that there is only JavaScript file
index.js and there are no original TypeScript source code. While it is possible to debug generated JavaScript
too, it might be much better to see and debug original TypeScript code in browser.
So let's configure TypeScript to allow it.

Configuration for TypeScript is stored in file `tsconfig.json`, let's create the file and tell compiler to
generate source map files as well as run compiler in watch mode and provide source file:

`tsconfig.json`:
````json
{
    "compilerOptions": {
        "sourceMap": true,
        "watch": true
    },
    "files": [
        "index.ts"
    ]
}
````
Let's restart compiler: stop it with Ctrl-C and run with the following command:
````
tsc
````
Now it will produce additional file `index.js.map` that contains source code map.
Let's refresh browser and look to the sources. As you can see, original source code is visible in the debugger,
we can set breakpoints inside it and also see content of the variables when debugger is paused.

Next let's do a mistake in our source code and see what happens. Instead of assigning a string to `greetings` variable
let's assign a number to it. 

`index.ts`:
````typescript
let greetings: string = 42;
document.body.innerHTML =  greetings;
````
IDE will warn us about the error and also compiler will output error to the console:

`console output`:
````
index.ts(1,5): error TS2322: Type 'number' is not assignable to type 'string'.
````
But compiler will not stop compilation on error and still produce JavaScript file:

`index.js`:
````javascript
var greetings = 42;
document.body.innerHTML = greetings;
//# sourceMappingURL=index.js.map
````
As you can see, it is syntactically valid JavaScript file, but semantics of TypeScript is broken because we
declared `greetings` to be string variable.

Let's make more mistakes - remove assignment operators from both lines and see what happens:

`index.ts`:
````typescript
let greetings: string 42;
document.body.innerHTML greetings;
````
IDE and TypeScript compiler warn us about the error:

`console output`:
````
index.ts(1,23): error TS1005: '=' expected.
index.ts(2,25): error TS1005: ';' expected.
````

But compiler still produce JavaScript code that is completely broken this time:

`index.js`:
````javascript
var greetings = 42;
document.body.innerHTML;
greetings;
//# sourceMappingURL=index.js.map
````
We also can't debug it using source code maps because erroneous code in TypeScript can't be correctly
mapped to produced JavaScript code. 

So we can conclude that default behavior of TypeScript compiler to produce output code even if source files
have errors is not quite correct.       

Let's fix it by adding option `noEmitOnError` to configuration of the compiler:

`tsconfig.json`:
````json
{
    "compilerOptions": {
        "sourceMap": true,
        "watch": true,
        "noEmitOnError": true
    },
    "files": [
        "index.ts"
    ]
}
````
This configuration will stop compiler from producing output if there are errors in source code.  