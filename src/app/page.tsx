import Mapa from "../components/Mapa";
import clinicas from "../Api/clinicas.json";

type endereco = {
  numero: string,
  rua: string,
  bairro: string,
  cidade: string,
  uf: string,
  cep: string
}

export default function Home() {

  function formatarEndereco(objEndereco: endereco){
    const {numero, rua, bairro, cidade, uf, cep} = objEndereco;
    const enderecoFormatado = `${rua}, ${numero} - ${bairro}, ${cidade} - ${uf}, ${cep}`;
    return enderecoFormatado;
  }

  return (
    <div>
      <header>
        <h1 className="text-center font-bold text-3xl p-4 bg-roxo text-white">Agenda Saúde</h1>
      </header>
      <main>
        <div className="flex">
          <aside className="w-1/5">
            <h1 className="font-bold p-2 text-center text-2xl">Clínicas</h1>
            <ul>
              {clinicas.map(clinica => {
                return (
                  <li className=" hover:bg-gray-300 hover:cursor-pointer p-4" key={clinica.id}>
                    <h4 className="font-bold text-lg">{clinica.nome}</h4>
                    <h5 className="text-sm">{clinica.titulo}</h5>
                    <p>{formatarEndereco(clinica.endereco)}</p>
                  </li>
                );
              })}
            </ul>
          </aside>
          <Mapa cidade={{geo:{lat: -11.337516, lng: -38.96385}}} clinicas={[clinicas[0]]}/>
        </div>
      </main>
    </div>
  );
}