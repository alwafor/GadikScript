(function gadikToBrowser() {
   let gadikNode = document.querySelector("#GadikScript");
   let gadikText = getTxtFromSrc(gadikNode);
   addScriptNode(translateGadikToJs(gadikText));

   function getTxtFromSrc(node) {
      //Пошли искать сорцы
      var src = node.getAttribute("src");
      if (src !== null && src.length) {
         var xml = new XMLHttpRequest();
         xml.open("GET", src, false);
         xml.send(null);
         if (xml.status == 200 || xml.status == 0) return xml.responseText;
      }
   }

   function addScriptNode(content) {
      var js_script = document.createElement("script");
      js_script.innerHTML = content;
      document.body.appendChild(js_script);
   }

   function translateGadikToJs(text) {
      let allLines = text.split("\n");
      let code = "";
      let lineIndex = 0;
      for (; lineIndex < allLines.length; ++lineIndex) {
         code += dealWithOneString(allLines[lineIndex]);
      }

      function dealWithOneString(item) {
         item = item.trim();
         if (item.endsWith(";")) item = item.slice(0, item.length - 1);
         let res = "";
         if (/\/?\*\/?/gi.test(item)) return "";
         else if (item.startsWith("int[]")) {
            let [_, varName, __, arrayStr] = item.split(" ");
            res = `let ${varName} = ${arrayStr}`;
         } else if (item.startsWith("int")) {
            let [_, varName, __, number] = item.split(" ");
            if (!Number.isInteger(+number))
               throw new Error("Not valid integer on line " + lineIndex + "!");
            if (number % 1 !== 0)
               throw new Error(
                  "Integers cannot have a fractional part!" + lineIndex
               );

            res = `let ${varName} = ${number}`;
         } else if (item.includes("log")) {
            res = "console.log(" + item.match(/\((.*)\)/)[1] + ")";
         } else if (item.includes("for")) {
            let forCommand = item;
            console.log(forCommand);
            commands = [];
            let [_, varName, __, interval] = forCommand.split(" ");
            interval = interval.split("..");
            let mainForLine = `for(let ${varName} = ${interval[0]}; ${varName} <= ${interval[1]}; ++${varName}){\n`;
            while (!allLines[lineIndex].includes("}")) {
               lineIndex++;
               commands.push(allLines[lineIndex].trim());
               if (lineIndex > allLines.length)
                  throw new Error("Unclosed for loop!");
            }
            commands.splice(-1);
            console.log("ITEM:", commands);
            let dealedCommands = commands.map(dealWithOneString);
            res = mainForLine + dealedCommands.join("") + "}";
         } else res = item;
         return res === "" ? "" : res + ";\n";
      }

      return code;
   }
})();
