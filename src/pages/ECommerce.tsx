import Layout from "../layout/Layout";
import Navbar from "../layout/Navbar";
import Aside from "../layout/Aside";
import Footer from "../layout/Footer";
import Main from "../layout/Main";
import React, {useContext} from "react";
import {GlobalContext} from "../context/GlobalContext";
import CartDetails from "../components/CartDetails";
import ProductDetails from "../components/ProductDetails";

export default function ECommerce() {
    const {
        showCart,
        showProduct,
        isDisconnected,
    } = useContext(GlobalContext);

    const selecView = () => {
        if (isDisconnected) {
            return <h1>Se ha perdido la conexión a internet</h1>
        }
        if (showProduct) {
            return <ProductDetails/>
        } else if (showCart) {
            return <CartDetails/>
        } else {
            return <Main/>
        }
    }

    return (
        <Layout
            navbar={<Navbar/>}
            aside={<Aside/>}
            footer={<Footer/>}
        >
            {selecView()}
        </Layout>
    )
}
