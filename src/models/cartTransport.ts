import Transport from "./transport";
import Cart from "./cart";

interface CartTransport {
    id: number;
    transport: Transport;
    carT: Cart;
    quantity: number;
    unitPrice: number;
}

export default CartTransport;
