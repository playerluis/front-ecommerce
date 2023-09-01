import React, {useState} from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button, Alert,
} from '@mui/material';
import {ContentType, HttpMethod} from "../utils/HttpUtils";
import {responseManager} from "../utils/ResponseManager";


const formStyle = {
    width: '100%',
    marginTop: '20px',
};

const submitButtonStyle = {
    marginTop: '30px',
};

export default function ECommerce() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<React.ReactNode | null>(null);

    console.log('Username:', username);
    console.log('Password:', password);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try {

            const response: Response = await fetch(`http://localhost:8080/auth/authenticate`, {
                method: HttpMethod.POST,
                headers: {
                    'Content-Type': ContentType.JSON
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const text = await responseManager(
                response,
                "TEXT",
                "TEXT"
            );

            localStorage.setItem("token", "Bearer " + text);
            window.location.href = "/";

        } catch (error) {
            if (error instanceof Error)
                setAlert(<Alert severity="error">{error.message}</Alert>)
            else
                setAlert(<Alert severity="error">{error + ""}</Alert>)
        }
    }


    return (

        <Container>
            <Paper elevation={3} style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '400px',
                margin: 'auto',
                marginTop: '30px',
            }}
            >
                <Typography component="h1" variant="h5">
                    Iniciar sesión
                </Typography>
                <form style={formStyle} onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Nombre de usuario"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={submitButtonStyle}
                    >
                        Iniciar sesión
                    </Button>
                </form>
                {alert}
            </Paper>
        </Container>
    )
}
