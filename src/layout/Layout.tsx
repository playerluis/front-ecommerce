import React, {PropsWithChildren, ReactNode, useContext} from 'react';
import {CssBaseline, AppBar, Toolbar, Typography, Stack} from '@mui/material';

import {GlobalContext} from "../context/GlobalContext";

interface LayoutProps extends PropsWithChildren {
    aside: ReactNode;
    navbar: ReactNode;
    footer: ReactNode;
}

function Layout({children, aside, navbar, footer}: LayoutProps) {
    const {showAside} = useContext(GlobalContext);


    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>

            <CssBaseline/>

            <AppBar position="static" style={{top: "0", height: "80px"}}>
                <Toolbar style={{display: "flex", alignItems: "center", flexDirection: "row"}}>

                    <Typography variant="h4" color="#C18E37" marginTop="9px">LCP REPUESTOS</Typography>

                </Toolbar>
            </AppBar>

            {navbar}


            <Stack direction="row" spacing={2} style={{flexGrow: 1}}>
                {aside &&
                    (
                        <aside
                            style={{
                                width: '20%',
                                transition: 'margin 0.3s',
                                marginLeft: showAside ? '0' : '-20%',
                                height: "100%",
                                overflow: "auto",
                            }}
                        >
                            {aside}
                        </aside>
                    )}
                <main style={{
                    width: '100%',
                    transition: 'flex 0.3s',
                    overflow: "auto",
                }}>
                    {children}
                </main>
            </Stack>
            {footer}
        </div>
    );
}

export default Layout;
