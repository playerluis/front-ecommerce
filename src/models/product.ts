import Category from "./category";


interface Product {
    id: number;
    price: number;
    imagePath: string;
    stock: number;
    category: Category;
    description: string;
    name: string;
    isOffer: boolean;
    offerPrice: number;
    isNew: boolean;
}

export default Product;
