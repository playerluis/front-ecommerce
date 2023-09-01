import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";
import {GlobalContextProvider} from "./context/GlobalContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#C18E37',
        },
    },
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function (reg) {
            console.log('Registro de SW exitoso', reg);
        })
        .catch(function (err) {
            console.warn('Error al tratar de registrar el sw', err);
        })

}



root.render(
    <ThemeProvider theme={darkTheme}>
        <GlobalContextProvider>
            <App/>
        </GlobalContextProvider>
    </ThemeProvider>
);

reportWebVitals();
