import db from "./reference.json" assert {type: "json"};
import fs from "fs";
// eslint-disable-next-line @typescript-eslint/no-var-requires
//var fs = require ("fs");

let nomeCidades = db.cidades.map(cidade => cidade.municipio);
nomeCidades = nomeCidades.sort();
let cidades = {cidades: nomeCidades};
fs.appendFile("cidades_nomes.json", JSON.stringify(cidades), function (err) {
  if (err) throw err;
  console.log("Arquivo salvo!");
});
//console.log(nomeCidades.sort());
//JSON.parse(nomeCidades.sort());