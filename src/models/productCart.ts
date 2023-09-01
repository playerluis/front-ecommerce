import Product from "./product";
import Cart from "./cart";

interface ProductCart {
    id: number;
    cart: Cart;
    product: Product;
    quantity: number;
}

export default ProductCart;
