import { ProductosRepository } from './productos.repository.js';
import { obtenerAlertaStock } from '../../utils/stock.js';

const repository = new ProductosRepository();

export class ProductosService {
  formatProduct(product) {
    if (!product) return null;
    
    const proveedores = product.proveedores
      ? product.proveedores.map(p => p.proveedor)
      : [];

    return {
      id: product.id,
      codigo: product.codigo,
      nombre: product.nombre,
      peso: Number(product.peso),
      cantidadAlmacenada: product.cantidadAlmacenada,
      tipoEmpaque: product.tipoEmpaque,
      precioUnitario: Number(product.precioUnitario),
      categoria: product.categoria,
      proveedores,
      alerta: obtenerAlertaStock(product.cantidadAlmacenada)
    };
  }

  async createProducto(data, proveedorIds = []) {
    const existing = await repository.findByCodigo(data.codigo);
    if (existing) {
      const error = new Error('Ya existe un producto registrado con ese código');
      error.statusCode = 400;
      throw error;
    }
    const prod = await repository.create(data, proveedorIds);
    return this.formatProduct(prod);
  }

  async getAllProductos() {
    const products = await repository.findAll();
    return products.map((p) => this.formatProduct(p));
  }

  async getProductoById(id) {
    const prod = await repository.findById(id);
    if (!prod) {
      const error = new Error('Producto no encontrado');
      error.statusCode = 404;
      throw error;
    }
    return this.formatProduct(prod);
  }

  async updateProducto(id, data, proveedorIds) {
    await this.getProductoById(id);
    if (data.codigo) {
      const existing = await repository.findByCodigo(data.codigo);
      if (existing && existing.id !== Number(id)) {
        const error = new Error('Ya existe otro producto registrado con ese código');
        error.statusCode = 400;
        throw error;
      }
    }
    const prod = await repository.update(id, data, proveedorIds);
    return this.formatProduct(prod);
  }

  async deleteProducto(id) {
    await this.getProductoById(id);
    return repository.delete(id);
  }
}
