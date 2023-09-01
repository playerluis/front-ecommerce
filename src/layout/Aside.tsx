import React, {useContext, useState} from 'react';
import {
    Paper,
    List,
    ListItemText,
    ListItemButton,
    Drawer,
    useMediaQuery,
    useTheme
} from '@mui/material';
import UseEffectOnce from "../utils/UseEffectOnce";
import {responseManager} from "../utils/ResponseManager";
import Category from "../models/category";
import {GlobalContext} from "../context/GlobalContext";

function Aside() {
    const {showAside, setShowAside, setSelectedCategory} = useContext(GlobalContext);
    const [categories, setCategories] = useState<Category[]>([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    UseEffectOnce(() => {
        async function loadCategories() {
            const response = await fetch(`http://localhost:8080/categories/listar`);
            const categories: Category[] = await responseManager(
                response,
                "JSON",
                "TEXT"
            );
            setCategories(categories);
        }

        loadCategories().then();
    });

    const handleCategorySelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setShowAside(false);
        setSelectedCategory(event.currentTarget.textContent || "");
    };

    return (
        <Drawer
            anchor={isMobile ? 'right' : 'left'}
            open={showAside}
            onClose={() => setShowAside(false)}
        >
            <Paper elevation={3} style={{padding: '16px', textAlign: 'center', height: "100vh"}}>
                <List component="nav">
                    <ListItemButton>
                        <ListItemText primary="Todas las Categorías" onClick={handleCategorySelect}/>
                    </ListItemButton>
                    {categories.map((category, index) => (
                        <ListItemButton key={index * 10}>
                            <ListItemText primary={category.name} onClick={handleCategorySelect}/>
                        </ListItemButton>
                    ))}
                </List>
            </Paper>
        </Drawer>
    );
}

export default Aside;
