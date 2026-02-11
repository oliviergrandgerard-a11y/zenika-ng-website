import { Product } from '../types/product';

function calculateStock(products: Product[], product: Product) {
  return products.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
}

export { calculateStock };
