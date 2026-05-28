import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProductosRepository } from './productos.repository.js';
import { obtenerAlertaStock } from '../../utils/stock.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      imagenUrl: product.imagenUrl,
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

  async updateImagen(id, imagenUrl) {
    const producto = await this.getProductoById(id);
    
    if (producto.imagenUrl) {
      const relativePath = producto.imagenUrl;
      const absolutePath = path.join(__dirname, '../../../', relativePath);
      try {
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
        }
      } catch (err) {
        console.error(`Error al eliminar la imagen anterior: ${err.message}`);
      }
    }

    const prod = await repository.update(id, { imagenUrl });
    return this.formatProduct(prod);
  }

  async deleteProducto(id) {
    await this.getProductoById(id);
    return repository.delete(id);
  }
}
