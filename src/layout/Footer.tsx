import React from 'react';
import { Paper, Typography, Link } from '@mui/material';

function Footer() {
    return (
        <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6">Contáctanos</Typography>
            <Typography>
                Si tienes alguna pregunta o consulta, no dudes en contactarnos:
            </Typography>
            <Typography>
                Teléfono: <Link href="tel:+593961803825">+593 96 1803 825</Link>
            </Typography>
            <Typography>
                Correo electrónico: <Link href="mailto:espe@joyeriatienda.com">info@joyeriatienda.com</Link>
            </Typography>
            <Typography variant="h6" style={{ marginTop: '16px' }}>Síguenos en redes sociales</Typography>
            <div>
                <Link href="#" style={{ marginRight: '8px' }}>Facebook</Link>
                <Link href="#" style={{ marginRight: '8px' }}>Instagram</Link>
                <Link href="#" style={{ marginRight: '8px' }}>Twitter</Link>
            </div>
            <Typography style={{ marginTop: '16px' }}>
                &copy; 2023 Repuestos Tienda. Todos los derechos reservados.
            </Typography>
        </Paper>
    );
}

export default Footer;
