let { readFile, writeFile } = require("fs");

writeFile("arquivo.txt", "Isso é um teste!", (err) => {
	if (err) console.log(err);
	else console.log("Escreveu no arquivo!");
});

readFile("arquivo.txt", "utf8", (err, txt) => {
	if (err) throw err;
	else console.log(txt);
});
