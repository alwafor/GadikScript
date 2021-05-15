//////SECTION TRANSLATION
let code = "";
let lineIndex = 0;
let allLines: readonly string[] = [];

const resetCode: () => void = () => {
   code = "";
   lineIndex = 0;
};

function translateGadikToJs(text: string) {
   allLines = text.split("\n");

   for (; lineIndex < allLines.length; ++lineIndex) {
      code += dealWithOneString(allLines[lineIndex]);
   }
   return code;
}

function dealWithOneString(item: string) {
   item = item.trim();
   if (item.endsWith(";")) item = item.slice(0, item.length - 1);
   let res = "";
   if (/\/?\*\/?/gi.test(item)) return "";
   else if (item.startsWith("int[]")) {
      res = varTypes["int[]"](item);
   } else if (item.startsWith("int")) {
      res = varTypes["int"](item);
   } else if (item.startsWith("bool")) {
      res = varTypes["bool"](item);
   } else if (item.startsWith("float")) {
      res = varTypes["float"](item);
   } else if (item.includes("log")) {
      res = globalMethods["log"](item);
   } else if (item.includes("for")) {
      res = globalLoops["for"](item);
   } else res = item;
   return res === "" ? "" : res + ";\n";
}

type ParserFn = (codeLine: string) => string;
type CheckerFn = (expression: string) => void;

type TVarExpression = [string, string];
interface IVarTypes {
   "int[]": ParserFn;
   int: ParserFn;
   float: ParserFn;
   bool: ParserFn;
   _extract_expression: (expression: string) => TVarExpression;
}
const varTypes: IVarTypes = {
   "int[]": (codeLine: string) => {
      let [_, varName, __, arrayStr] = codeLine.split(" ");
      arrayStr
         .slice(1, arrayStr.length - 1)
         .split(",")
         .forEach(checkers.int);
      return `let ${varName} = ${arrayStr}`;
   },
   int: (codeLine: string) => {
      let [varName, value] = varTypes._extract_expression(codeLine);
      checkers.int(value);
      return `let ${varName} = ${value}`;
   },
   float: (codeLine: string) => {
      let [varName, value] = varTypes._extract_expression(codeLine);
      if(value.includes(',')) value = value.replace(',','.');
      checkers.float(value);
      return `let ${varName} = ${value}`;
   },
   bool: (codeLine: string) => {
      let [varName, value] = varTypes._extract_expression(codeLine);
      checkers.bool(value);
      return `let ${varName} = ${value}`;
   },
   _extract_expression: (expression: string) => {
      let [_, varName, __, value] = expression
         .split(" ")
         .filter((item) => item !== "");
      return [varName, value];
   },
};
interface ICheckers {
   int: CheckerFn;
   float: CheckerFn;
   bool: CheckerFn;
}
const checkers: ICheckers = {
   int: (numberStr: string) => {
      let num = +numberStr.trim();
      if (!Number.isInteger(+numberStr.trim())) {
         throw new Error(`Number is not an integer on line ${lineIndex + 1}!`);
      }
      if (num % 1 !== 0) {
         throw new Error("Integers cannot have a fractional part!" + lineIndex);
      }
   },
   float: (value: string) => {
      let num = +value;
      if (isNaN(num)) {
         throw new Error(`Number is not a float on line ${lineIndex + 1}!`);
      }
   },
   bool: (value: string) => {
      if (value !== "false" && value !== "true") {
         throw new Error(
            `Uncorrect boolean value on line ${
               lineIndex + 1
            }! Use true or false instead.`
         );
      }
   },
};

const globalLoops = {
   for: (codeLine: string) => {
      let commands = [];
      let [_, varName, __, interval] = codeLine.split(" ");
      let mainForLine = "";
      if (interval.includes("..")) {
         let intervalArr = interval.split("..");
         mainForLine = `for(let ${varName} = ${intervalArr[0]}; ${varName} <= ${intervalArr[1]}; ++${varName}){\n`;
      } else {
         mainForLine = `for(let ${varName} of ${interval}){\n`;
      }

      while (!allLines[lineIndex].includes("}")) {
         lineIndex++;
         commands.push(allLines[lineIndex].trim());
         if (lineIndex > allLines.length) throw new Error("Unclosed for loop!");
      }
      commands.splice(-1);
      let dealedCommands = commands.map(dealWithOneString);
      return mainForLine + dealedCommands.join("") + "}";
   },
};

interface IGlobalMethods {
   log: ParserFn;
}
const globalMethods: IGlobalMethods = {
   log: (codeLine) => {
      return "console.log(" + codeLine.slice(4, codeLine.length - 1) + ")";
   },
};

//ПЕРЕВОДИТ GS В БРАУЗЕР
function gadikToBrowser() {
   let gadikNode = document.querySelector("#GadikScript");
   let gadikText = getTxtFromSrc(gadikNode);
   gadikNode.remove();
   addScriptNode(translateGadikToJs(gadikText));
   resetCode();

   function getTxtFromSrc(node: Element) {
      var src = node.getAttribute("src");
      if (src !== null && src.length) {
         var xml = new XMLHttpRequest();
         xml.open("GET", src, false);
         xml.send(null);
         if (xml.status == 200 || xml.status == 0) return xml.responseText;
      }
   }

   function addScriptNode(content: string) {
      var js_script = document.createElement("script");
      js_script.innerHTML = content;
      document.body.appendChild(js_script);
   }
}

gadikToBrowser();
