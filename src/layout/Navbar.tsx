import React, {useContext, useState, MouseEvent} from 'react';
import {AppBar, Typography, IconButton, Badge, Menu, MenuItem, Select, SelectChangeEvent, Stack, Link, Button, Grid} from '@mui/material';
import {ShoppingCart as ShoppingCartIcon, AccountCircle, Person as PersonIcon, ExitToApp as ExitToAppIcon, Menu as MenuIcon} from '@mui/icons-material';

import {GlobalContext} from "../context/GlobalContext";
import useEffectOnce from "../utils/UseEffectOnce";
import Cart from "../models/cart";
import {responseManager} from "../utils/ResponseManager";
import {HttpMethod} from "../utils/HttpUtils";

function Navbar() {

    const {
        setCartId,
        cartId,
        showCart,
        setShowCart,
        setShowProduct,
        showAside,
        setShowAside,
        user
    } = useContext(GlobalContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [carts, setCarts] = useState<Cart[]>([]);

    const handleCartChange = (event: SelectChangeEvent<number>) => {
        console.log("handleCartChange" + event.target.value);
        const selectedValue = event.target.value;
        if (typeof selectedValue === 'number') {
            setCartId(selectedValue);
        } else {
            setCartId(parseInt(selectedValue));
        }

    };

    async function loadCarts() {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await fetch('http://localhost:8080/cart/get_carts', {
                method: HttpMethod.GET,
                headers: {
                    Authorization: token,
                },
            });
            const cartsData = await responseManager(
                response,
                'JSON',
                'TEXT')
            setCarts(cartsData);
        } catch (error) {

        }
    }

    const handleCreateNewCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await fetch('http://localhost:8080/cart/create_new', {
                method: HttpMethod.POST,
                headers: {
                    Authorization: token,
                },
            });
            const newCartData: Cart = await responseManager(response, 'JSON', 'TEXT');
            await loadCarts();
            setCartId(newCartData.id);

        } catch (error) {
            console.error('Error al crear un nuevo carrito:', error);
        }
    };

    useEffectOnce(() => {
        loadCarts().then();
    });

    const handleShowAside = () => {
        setShowAside(!showAside);
    }

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleLogout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            id="simple-menu"
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {user ?
                <MenuItem onClick={handleLogout}>
                    <ExitToAppIcon style={{marginRight: '8px'}}/>
                    Cerrar Sesión
                </MenuItem>

                :
                <Link underline="none" href="/login">
                    <MenuItem>
                        <PersonIcon style={{marginRight: '8px'}}/>
                        Iniciar Sesión
                    </MenuItem>
                </Link>
            }


        </Menu>
    );

    return (
        <AppBar position="static">
            <Grid direction="row" container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleShowAside}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Typography variant="h6">
                            REPUESTOS TRANSPORTES DE CARGA PESADA
                        </Typography>
                        <div style={{flexGrow: 1}}/>
                    </Stack>
                </Grid>

                <Grid item>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton aria-label="shopping cart" size="medium">
                            <Badge badgeContent={carts.length} color="secondary">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>
                        {user && (
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Select
                                    value={cartId ?? 0}
                                    onChange={handleCartChange}
                                    style={{minWidth: '120px'}}
                                >
                                    {carts.map((cart) => (
                                        <MenuItem key={cart.id} value={cart.id}>
                                            Carrito {cart.id}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button
                                    variant="text"
                                    style={{textTransform: 'none'}}
                                    onClick={() => {
                                        setShowCart(!showCart);
                                        setShowProduct(false);
                                    }}
                                >
                                    {showCart ? 'Ocultar' : 'Mostrar'} Carrito
                                </Button>
                                <Button
                                    variant="text"
                                    style={{textTransform: 'none'}}
                                    onClick={handleCreateNewCart}
                                >
                                    Nuevo
                                </Button>
                            </Stack>
                        )}

                        <IconButton
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            {user ? (
                                <Typography variant="body1">{user.username}</Typography>
                            ) : (
                                <Typography variant="body1">Iniciar Sesión</Typography>
                            )}
                            <AccountCircle/>
                        </IconButton>
                    </Stack>
                </Grid>
            </Grid>
            {renderMenu}
        </AppBar>
    );
}

export default Navbar;
