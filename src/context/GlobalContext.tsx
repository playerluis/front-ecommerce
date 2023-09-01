import React, {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";
import User from "../models/user";
import Product from "../models/product";

interface GlobalContextaProps {
    showAside: boolean;
    setShowAside: Dispatch<SetStateAction<boolean>>;
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    cartId: number | null;
    setCartId: Dispatch<SetStateAction<number | null>>;
    showCart: boolean;
    setShowCart: Dispatch<SetStateAction<boolean>>;
    showProduct: boolean;
    setShowProduct: Dispatch<SetStateAction<boolean>>;
    product: Product | null;
    setProduct: Dispatch<SetStateAction<Product | null>>;
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    isDisconnected: boolean;
    setIsDisconnected: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextaProps>({
    showAside: false,
    setShowAside: (): void => {
    },
    user: null,
    setUser: (): void => {
    },
    cartId: null,
    setCartId: (): void => {
    },
    showCart: false,
    setShowCart: (): void => {
    },
    showProduct: false,
    setShowProduct: (): void => {
    },
    product: null,
    setProduct: (): void => {

    },
    selectedCategory: '',
    setSelectedCategory: (): void => {
    },
    isDisconnected: false,
    setIsDisconnected: (): void => {
    }
});

export function GlobalContextProvider({children}: PropsWithChildren) {
    const [showAside, setShowAside] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [cartId, setCartId] = useState<number | null>(null);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [showProduct, setShowProduct] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
    const [isDisconnected, setIsDisconnected] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{
            showAside: showAside,
            setShowAside: setShowAside,
            user: user,
            setUser: setUser,
            cartId: cartId,
            setCartId: setCartId,
            showCart: showCart,
            setShowCart: setShowCart,
            showProduct: showProduct,
            setShowProduct: setShowProduct,
            product: product,
            setProduct: setProduct,
            selectedCategory: selectedCategory,
            setSelectedCategory: setSelectedCategory,
            isDisconnected: isDisconnected,
            setIsDisconnected: setIsDisconnected
        }}>
            {children}
        </GlobalContext.Provider>
    );
}