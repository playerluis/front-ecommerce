import User from "./user";

interface Cart {
    id: number;
    date: string;
    user: User;
    sold: boolean;
}

export default Cart;
