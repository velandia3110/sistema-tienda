import { ReportesService } from './reportes.service.js';

const service = new ReportesService();

export class ReportesController {
  async getClientesMasCompras(req, res, next) {
    try {
      const data = await service.getClientesMasCompras();
      const safeData = JSON.parse(
        JSON.stringify(data, (_, value) =>
          typeof value === 'bigint' ? Number(value) : value
        )
      );
      return res.json({
        success: true,
        data: safeData
      });
    } catch (error) {
      next(error);
    }
  }

  async getClientesCompraUnica(req, res, next) {
    try {
      const data = await service.getClientesCompraUnica();
      const safeData = JSON.parse(
        JSON.stringify(data, (_, value) =>
          typeof value === 'bigint' ? Number(value) : value
        )
      );
      return res.json({
        success: true,
        data: safeData
      });
    } catch (error) {
      next(error);
    }
  }

  async getClienteMasFrecuente(req, res, next) {
    try {
      const data = await service.getClienteMasFrecuente();

      const safeData = JSON.parse(
        JSON.stringify(
          data,
          (_, value) =>
            typeof value === 'bigint'
              ? Number(value)
              : value
        )
      );
      return res.json({
        success: true,
        data: safeData
      });

    } catch (error) {
      return next(error);
    }
  }
}
