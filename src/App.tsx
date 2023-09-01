import React, {useContext, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ECommerce from "./pages/ECommerce";
import Login from "./pages/Login";
import UseEffectOnce from "./utils/UseEffectOnce";
import {HttpMethod} from "./utils/HttpUtils";
import {responseManager} from "./utils/ResponseManager";
import {GlobalContext} from "./context/GlobalContext";
import User from "./models/user";


function App() {

    const {
        setUser,
        setIsDisconnected
    } = useContext(GlobalContext);

    UseEffectOnce(() => {
        async function loadUser() {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response: Response = await fetch(`http://localhost:8080/auth/user`, {
                    method: HttpMethod.GET,
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                const user: User = await responseManager(
                    response,
                    "JSON",
                    "TEXT"
                );
                setUser(user);
            } catch (error) {
                localStorage.removeItem('token');
                if (error instanceof Error) {
                    setUser(null);
                }
                console.log(error);
            }
        }

        loadUser().then()
    })

    const test = async () => {
        try {
            const response = await fetch('http://localhost:8080/test/hello');
            const message = await responseManager(response, 'TEXT', 'TEXT');
            console.log(message);
            setIsDisconnected(false);
        } catch (error) {
            setIsDisconnected(true);
        }

    }

    window.addEventListener('offline', async () => {
        await test();
    });

    window.addEventListener('online', async () => {
        await test();
    });

    test().then()


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ECommerce/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
