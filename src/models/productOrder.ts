import Product from "./product";
import Order from "./order";

interface ProductOrder {
    id: number;
    order: Order;
    product: Product;
    quantity: number;
    unitPrice: number;
}

export default ProductOrder;
