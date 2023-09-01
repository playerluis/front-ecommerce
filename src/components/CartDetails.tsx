import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
    Container,
    Card,
    Typography,
    Button,
    IconButton,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    styled, Alert, Stack,
} from '@mui/material';
import {HttpMethod} from '../utils/HttpUtils';
import {responseManager} from '../utils/ResponseManager';
import DeleteIcon from '@mui/icons-material/Delete';
import useEffectOnce from "../utils/UseEffectOnce";
import ProductCart from "../models/productCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {GlobalContext} from "../context/GlobalContext";
import Cart from "../models/cart";

const StyledCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

function CartDetails() {

    const {
        cartId,
        setShowCart,
    } = useContext(GlobalContext);
    const [cartItems, setCartItems] = useState<ProductCart[]>([]);
    const [alert, setAlert] = useState<React.ReactNode | null>(null);
    const [cart, setCart] = useState<Cart | null>(null);

    const handleLoadCart = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8080/cart/ver/' + cartId, {
                method: HttpMethod.GET,
                headers: {
                    Authorization: token,
                },
            });
            const newCartData: Cart = await responseManager(response, 'JSON', 'TEXT');
            setCart(newCartData);
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
        }
    }, [cartId]);

    const handleMakePurchase = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8080/cart/make_purchase?id=' + cartId, {
                method: HttpMethod.POST,
                headers: {
                    Authorization: token,

                },
            });
            const newCartData = await responseManager(response, 'TEXT', 'TEXT');
            setAlert(<Alert severity="success">{newCartData + ""}</Alert>);
            handleLoadCart().then();
        } catch (error) {
            setAlert(<Alert severity="error">Error al realizar la compra</Alert>);
            console.error('Error al crear un nuevo carrito:', error);
        }
    }

    const handleDeleteCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await fetch('http://localhost:8080/cart/eliminar/' + cartId, {
                method: HttpMethod.DELETE,
                headers: {
                    Authorization: token,
                },
            });
            const newCartData = await responseManager(response, 'TEXT', 'TEXT');
            setAlert(<Alert severity="success">{newCartData + ""}</Alert>);

        } catch (error) {
            setAlert(<Alert severity="error">Error al eliminar el carrito</Alert>);
            console.error('Error al crear un nuevo carrito:', error);
        }
    }

    const fetchCartItems = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token || !cartId) {
            return;
        }

        try {
            const url = `http://localhost:8080/productCart/listar`;

            const response = await fetch(url, {
                method: HttpMethod.GET,
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            let cartItemsData: ProductCart[] = await responseManager(
                response,
                'JSON',
                'JSON'
            );
            cartItemsData = cartItemsData.filter((item) => item.cart.id === cartId);

            setCartItems(cartItemsData);
            setAlert(<Alert severity="success">Productos del carrito obtenidos correctamente</Alert>);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            setAlert(<Alert severity="error">Error al obtener los productos del carrito</Alert>);

        }
    }, [cartId]);

    useEffectOnce(() => {
        fetchCartItems().then();
        handleLoadCart().then();
    });

    useEffect(() => {
        fetchCartItems().then();
        handleLoadCart().then();
    }, [cartId, fetchCartItems, handleLoadCart])

    const handleRemoveCartItem = async (productId: number) => {
        const token = localStorage.getItem('token');
        if (!token || !cartId)
            return;

        console.log("cartId: " + cartId + " productId: " + productId);
        try {
            const url = `http://localhost:8080/cart/remove_item?id=${cartId}&productId=${productId}`;

            const response = await fetch(url, {
                method: HttpMethod.POST,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                await fetchCartItems();
                setAlert(<Alert severity="success">Producto eliminado del carrito correctamente</Alert>);
            } else {
                const error = await responseManager(response, 'TEXT', 'TEXT');
                setAlert(<Alert severity="error">Error al eliminar el producto del carrito: {error}</Alert>);
            }
        } catch (error) {
            console.error('Error removing cart item:', error);
            setAlert(<Alert severity="error">Error al eliminar el producto del carrito: {error + ""}</Alert>);
        }
    };

    return (
        <Container maxWidth="lg">
            {alert}
            <StyledCard>
                <Typography variant="h4" gutterBottom>
                    Carrito de Compras
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Producto</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Precio Unitario</TableCell>
                                <TableCell>Subtotal</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.product.id}>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${item.product.price.toFixed(2)}</TableCell>
                                    <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="remove"
                                            onClick={() => handleRemoveCartItem(item.product.id)}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} alignItems="center">
                    <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon/>} onClick={
                        () => setShowCart(false)
                    }>
                        Volver
                    </Button>
                    {cart != null && !cart.sold ?
                        <>
                            <Button variant="outlined" color="primary" onClick={handleMakePurchase}>
                                Realizar Compra
                            </Button>
                            <Button variant="outlined" color="primary" onClick={handleDeleteCart}>
                                Eliminar Carrito
                            </Button>
                        </>
                        :
                        <Button variant="outlined" color="primary" disabled>
                            Carrito Vendido
                        </Button>
                    }

                </Stack>
            </StyledCard>
        </Container>
    );
}

export default CartDetails;
