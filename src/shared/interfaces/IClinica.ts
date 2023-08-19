export interface IClinica {
  id?: number
  // nome_fantasia?: string
  // tipo?: string
  // especialidades?: string[]
  endereco: {
    // numero?: string
    // rua?: string
    // bairro?: string
    // uf?: string
    geo: {
      lat: number
      lng: number
    }
  }
}