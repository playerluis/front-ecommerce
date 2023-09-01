import React, {useContext, useState} from 'react';
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    styled,
    Alert,
    TextField,
    InputAdornment,
    Box,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {GlobalContext} from '../context/GlobalContext';
import {HttpMethod} from '../utils/HttpUtils';
import {responseManager} from '../utils/ResponseManager';

const StyledCard = styled(Card)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
}));

function ProductDetails() {

    const {
        user,
        cartId,
        product,
        setShowProduct
    } = useContext(GlobalContext);

    const [addingToCart, setAddingToCart] = useState(false);
    const [alert, setAlert] = useState<React.ReactNode | null>(null);
    const [quantity, setQuantity] = useState(1); // Default quantity



    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value);
        setQuantity(newQuantity);
    };

    const handleAddToCart = async () => {
        setAddingToCart(true);

        const token = localStorage.getItem('token');
        if (!token || !product)
            return;

        try {
            const url = `http://localhost:8080/cart/add?id=${cartId}&productId=${product.id}&quantity=${quantity}`;

            const response = await fetch(url, {
                method: HttpMethod.POST,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            });

            const text = await responseManager(response, 'TEXT', 'TEXT');

            if (response.ok) {
                setAlert(<Alert severity="success">{text}</Alert>);
            }
        } catch (error) {
            if (error instanceof Error)
                setAlert(<Alert severity="error">{error.message}</Alert>);
            else setAlert(<Alert severity="error">{error + ''}</Alert>);
        }

        setAddingToCart(false);
    };

    if (!product) {
        return (
            <Container maxWidth="lg" style={{marginTop: "25px"}}>
                <Alert severity="error">Producto no encontrado</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" style={{marginTop: "25px"}}>
            <StyledCard>
                <CardMedia
                    component="img"
                    //src={product.image_path}
                    alt={product.name}
                    style={{
                        maxWidth: '100%',
                        maxHeight: 600,
                    }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        {product.description}
                    </Typography>
                    {product.isOffer ? (
                        <Box>
                            <Typography variant="h6" color="textPrimary">
                                Offer Price: ${product.offerPrice}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Price: ${product.price}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="h6" color="textPrimary">
                            Price: ${product.price}
                        </Typography>
                    )}
                    <Typography variant="subtitle1" color="textSecondary">
                        Stock: {product.stock}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Category: {product.category.name}
                    </Typography>
                </CardContent>
                {user ? (
                    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                        <TextField
                            type="number"
                            label="Cantidad"
                            value={quantity}
                            onChange={handleQuantityChange}
                            inputProps={{
                                min: 1,
                                max: product.stock,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AddShoppingCartIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddToCart}
                            disabled={addingToCart}
                            style={{marginTop: '8px'}}
                        >
                            Agregar al carrito
                        </Button>
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCartIcon/>}
                        disabled
                    >
                        Agregar al carrito (Inicia sesión primero)
                    </Button>
                )}
                <Button variant="outlined" color="primary" startIcon={<ArrowBackIcon/>} onClick={() =>
                    setShowProduct(false)
                }>
                    Volver
                </Button>
            </StyledCard>
            {alert}
        </Container>
    )
        ;
}

export default ProductDetails;
