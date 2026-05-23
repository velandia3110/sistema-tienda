import { ReportesRepository } from './reportes.repository.js';

const repository = new ReportesRepository();

export class ReportesService {
  async getClientesMasCompras() {
    return repository.getClientesMasCompras();
  }

  async getClientesCompraUnica() {
    return repository.getClientesCompraUnica();
  }

  async getClienteMasFrecuente() {
    return repository.getClienteMasFrecuente();
  }
}
