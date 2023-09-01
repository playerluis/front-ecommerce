import User from "./user";
import Product from "./product";

interface Comment {
    id: number;
    date: string;
    product: Product;
    user: User;
    comment: string;
}

export default Comment;
