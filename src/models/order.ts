import User from "./user";

interface Order {
    id: number;
    total: number;
    date: string;
    user: User;
}

export default Order;
