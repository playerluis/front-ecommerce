import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Stack, TextField, Grid} from '@mui/material';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import UseEffectOnce from '../utils/UseEffectOnce';
import {responseManager} from '../utils/ResponseManager';
import Product from '../models/product';
import ProductCard from '../components/ProductCard';
import {GlobalContext} from '../context/GlobalContext';

function Main() {
    const {selectedCategory} = useContext(GlobalContext);

    const [value, setValue] = useState('1');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [productName, setProductName] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    UseEffectOnce(() => {
        async function loadProducts() {
            const response: Response = await fetch('http://localhost:8080/products/listar');
            const products: Product[] = await responseManager(response, 'JSON', 'TEXT');
            console.log(products);
            setProducts(products);
            setFilteredProducts(products);
        }

        loadProducts().then();
    });

    useEffect(() => {
        applyFilters(value);
    }, [selectedCategory]);

    function handleChange(event: React.SyntheticEvent, newValue: string) {
        setValue(newValue);
        applyFilters(newValue);
    }

    function applyFilters(selectedTab: string) {
        const minPriceNumber = parseFloat(minPrice);
        const maxPriceNumber = parseFloat(maxPrice);

        const filtered = products.filter(product => {
            const price = product.price;
            const nameMatches = product.name.toLowerCase().includes(productName.toLowerCase());

            if (selectedTab === '1') {
                return (
                    (selectedCategory.includes('Todas') || product.category.name === selectedCategory) &&
                    nameMatches &&
                    (!minPrice || price >= minPriceNumber) &&
                    (!maxPrice || price <= maxPriceNumber)
                );
            } else if (selectedTab === '2') {
                return (
                    (selectedCategory.includes('Todas') || product.category.name === selectedCategory) &&
                    nameMatches &&
                    (!minPrice || price >= minPriceNumber) &&
                    (!maxPrice || price <= maxPriceNumber) &&
                    product.isNew
                );
            } else if (selectedTab === '3') {
                return (
                    (selectedCategory.includes('Todas') || product.category.name === selectedCategory) &&
                    nameMatches &&
                    (!minPrice || price >= minPriceNumber) &&
                    (!maxPrice || price <= maxPriceNumber) &&
                    product.isOffer
                );
            }

            return false;
        });

        setFilteredProducts(filtered);
    }

    return (
        <Container maxWidth="lg">
            <Stack marginTop="5px" direction="row">
                <TextField
                    style={{marginRight: '5px'}}
                    label="Precio mínimo"
                    variant="outlined"
                    value={minPrice}
                    onChange={e => {
                        if (e != null) {
                            setMinPrice(e.target.value);
                        }
                    }}
                />
                <TextField
                    style={{marginRight: '5px'}}
                    label="Precio máximo"
                    variant="outlined"
                    value={maxPrice}
                    onChange={e => {
                        if (e != null) {
                            setMaxPrice(e.target.value);
                        }
                    }}
                />
                <TextField
                    label="Nombre del producto"
                    variant="outlined"
                    value={productName}
                    onChange={e => {
                        if (e != null) {
                            setProductName(e.target.value);
                        }
                    }}
                />
                <Button
                    variant="contained"
                    style={{marginLeft: '5px'}}
                    onClick={() => applyFilters(value)}
                >
                    <FilterAltIcon/>
                    Filtrar
                </Button>
            </Stack>
            <Box sx={{width: '100%', typography: 'body1', marginTop: '5px'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Todo" value="1"/>
                            <Tab label="Novedades" value="2"/>
                            <Tab label="Ofertas" value="3"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Grid container spacing={2}>
                            {filteredProducts.map(product => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                    <ProductCard product={product}/>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid container spacing={2}>
                            {filteredProducts.map(product => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                    <ProductCard product={product}/>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                        <Grid container spacing={2}>
                            {filteredProducts.map(product => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                    <ProductCard product={product}/>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>
    );
}

export default Main;
