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
      <!--Your script-->
      <div id="GadikScript" src="gadikScripts/GadikScript.gs"></div>
      <!--GS translator-->
      <script src="dist/index.js"></script>
   </body>
</html>
```

So, let's imagine that the following code is in the GadikScript.gs:

```gs
//Write your awesome GadikScript Code here!
int a = 5;
int y = 78;
log(a);
log(y);

int[] arr = [1,2,3,4,5,5,5];
for n in 1..3 {
   log("The number is " + n + "!");
}

for n in arr {
   log("The element of array is " + n + "!");
}
```

The JS output of this code will be:

```js
//Write your awesome GadikScript Code here!
let a = 5;
let y = 78;
console.log(a);
console.log(y);
let arr = [1, 2, 3, 4, 5, 5, 5];
for (let n = 1; n <= 3; ++n) {
   console.log("The number is " + n + "!");
}
for (let n of arr) {
   console.log("The element of array is " + n + "!");
}
```

And this is the console output:

```console
5
78
The number is 1!
The number is 2!
The number is 3!
The element of array is 1!
The element of array is 2!
The element of array is 3!
The element of array is 4!
The element of array is 5!
The element of array is 5!
The element of array is 5!
```

So that's it! Next step is to get acquainted with GS syntax!

<p align="center">
  <img src="https://github.com/Buor/GadikScript/blob/main/GS_Logo.jpg?raw=true"/>
</p>
