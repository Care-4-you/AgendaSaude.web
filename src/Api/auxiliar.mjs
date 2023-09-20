import db from "./reference.json" assert {type: "json"};
import fs from "fs";

let nomeCidades = db.cidades.map(cidade => cidade.municipio);
nomeCidades = nomeCidades.sort();
let cidades = {cidades: nomeCidades};
fs.appendFile("cidades_nomes.json", JSON.stringify(cidades), function (err) {
  if (err) throw err;
  console.log("Arquivo salvo!");
});