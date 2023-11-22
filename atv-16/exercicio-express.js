let express = require("express");
let app = express();

app.get("/", (req, res) => res.json("Olá, mundo!"));

app.listen("3333", () => console.log("Servidor rodando em 3333."));
