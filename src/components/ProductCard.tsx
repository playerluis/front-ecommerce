import React, {useContext} from 'react';
import {Card, CardContent, CardMedia, Typography, Button, styled} from '@mui/material';
import Product from "../models/product";
import {GlobalContext} from "../context/GlobalContext";

const descriptionStyle = {
    marginTop: '8px',
};

const StyledCard = styled(Card)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const OfferStyledCard = styled(StyledCard)({
    border: '2px solid #C18E37', // Change border color for offer products
});

const NewStyledCard = styled(StyledCard)({
    border: '2px solid #3BB23B', // Change border color for new products
});

const ProductCard = ({product}: { product: Product }) => {

    const {setProduct, setShowProduct} = useContext(GlobalContext);

    const isOffer = product.isOffer;
    const isNew = product.isNew;


    const handleProductClick = () => {
        console.log("Product clicked:", product);
        setProduct(product);
        setShowProduct(true);
    }

    let CardComponent;

    if (isOffer) {
        CardComponent = OfferStyledCard;
    } else if (isNew) {
        CardComponent = NewStyledCard;
    } else {
        CardComponent = StyledCard;
    }


    return (
        <CardComponent>
            <CardMedia
                style={{
                    paddingTop: '56.25%', // Aspect ratio 1:1
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
                //image={product.imagePath}
                title={product.name}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
                    {product.description}
                </Typography>
                <Typography variant="subtitle1" color="textPrimary">
                    {isOffer ? `Offer Price: $${product.offerPrice}` : `Price: $${product.price}`}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                    Stock: {product.stock}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Category: {product.category.name}
                </Typography>
            </CardContent>
            <Button variant="contained" color="primary" fullWidth onClick={handleProductClick}>
                Ver detalles
            </Button>
        </CardComponent>
    );
}

export default ProductCard;
