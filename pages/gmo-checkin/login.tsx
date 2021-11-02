import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Login from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import Layout, { PageMeta } from "components/Layout";
import { GMO_CHECKIN_LOGIN_SESSION_COOKIE } from "constants/app";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { setToast } from "redux/appSlice";
import { getAuthenSession } from "services/gmo-checkin";

const pageMeta: PageMeta = {
    title: "GMO auto checkin - checkout",
    description: "GMO auto checkin - checkout",
};

function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const body = {
            email: data.get("email") as string,
            password: data.get("password") as string,
        };
        const res = await getAuthenSession(body);
        if (!res.errorCode) {
            jsCookie.set(GMO_CHECKIN_LOGIN_SESSION_COOKIE, res.cookie);
            router.replace("/gmo-checkin");
        } else {
            setLoading(false);
            dispatch(
                setToast({ message: `${res.message || JSON.stringify(res.response)}`, open: true, severity: "error" })
            );
        }
    };

    return (
        <Layout meta={pageMeta}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <LoadingButton
                            type="submit"
                            loadingPosition="start"
                            loading={loading}
                            startIcon={<Login />}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
}

export default LoginPage;
