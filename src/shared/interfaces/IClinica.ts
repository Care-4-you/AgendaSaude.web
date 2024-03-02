export interface IClinica {
  id: number;
  nome: string;
  titulo: string;
  imagem_url: string;
  avaliacao?: number;
  endereco: {
    numero?: string;
    rua?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    cep?: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
}
