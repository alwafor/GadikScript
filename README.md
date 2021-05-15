# GadikScript

<p align="center">
  <img src="https://github.com/Buor/GadikScript/blob/main/GS_500x.png?raw=true"/>
</p>

## What is it for?

GadikScript is actually a translator of GadikScript Syntax to raw JS (and TS in future). The aim of this language is to merge capabilities of some strong types languages like C++ and RUST. And just for fun 😈

## How to use it?

It's pretty simple! All you need is to create dome html-element in the end of the document, like div,span,etc. This element must have id "GadikScript" and src attribute, which refers to your GadikScript file (for example, script.gs). After you've done this, you need to add translator itself. It'll find all GadikScripts of html document and convert them to common JS. To use translator, you need to add script html tag with src attribute, which refers to index.js from GadikScript package. It lays in the dist folder. You can download just this one file, and rename it whatever you want. But the important thing is to include this script at the end of all included scripts. See right example of including below:

```html
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>GadikScript example</title>
   </head>
   <body>
      <div id="GadikScript" src="gadikScripts/GadikScript.gs"></div>
      <!--Your script-->
      <script src="dist/index.js"></script>
      <!--GS translator-->
   </body>
</html>
```

So, let's imagine that the following code is in the GadikScript.gs:

```gs
//Write your awesome GadikScript Code here!
int a = 5;
log("Integer value is " + a + "!");
float b = 5,9694;
log("Float value is " + b + "!");
bool c = false;
log("Boolean value is " + c + "!");

for n in 1..3 {
   log("One of three numbers is " + n + "!")
}

int[] array = [1,6,8];
for n in array {
   log("This is one of the arrays numbers! " + n + "!")
}
```

The JS output of this code will be:

```js
//Write your awesome GadikScript Code here!;
let a = 5;
console.log("Integer value is " + a + "!");
let b = 5.9694;
console.log("Float value is " + b + "!");
let c = false;
console.log("Boolean value is " + c + "!");
for(let n = 1; n <= 3; ++n){
   console.log("One of three numbers is " + n + "!");
};
let array = [1,6,8];
for(let n of array){
   console.log("This is one of the arrays numbers - " + n + "!");
};
```

And this is the console output:

```console
Integer value is 5!
Float value is 5.9694!
Boolean value is false!
One of three numbers is 1!
One of three numbers is 2!
One of three numbers is 3!
This is one of the arrays numbers - 1!
This is one of the arrays numbers - 6!
This is one of the arrays numbers - 8!
```
So that's it! Next step is to get acquainted with GS syntax!

<p align="center">
  <img src="https://github.com/Buor/GadikScript/blob/main/GS_Logo.jpg?raw=true"/>
</p>
