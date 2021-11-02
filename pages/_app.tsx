import "@fortawesome/fontawesome-svg-core/styles.css";
import { Alert, Snackbar, ThemeProvider } from "@mui/material";
import "assets/styles/index.scss";
import "components/Icons/FontAwesome";
import theme from "config/theme";
import { pageview } from "lib/gtag";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OneSignal from "react-onesignal";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setToast } from "redux/appSlice";
import store, { RootState } from "redux/store";

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
        OneSignal.init({
            appId: "d790617f-3ae7-4fa0-b27d-2409909ab696",
        });
    }, []);

    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url: any) => {
            pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
                <AppChild />
            </ThemeProvider>
        </Provider>
    );
}

function AppChild() {
    const dispatch = useDispatch();
    const toast = useSelector((state: RootState) => state.app.toast);

    const handleClose = () => {
        dispatch(setToast({ ...toast, open: false }));
    };

    return (
        <Snackbar
            open={toast.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert onClose={handleClose} severity={toast.severity} sx={{ width: "100%" }}>
                {toast.message}
            </Alert>
        </Snackbar>
    );
}

export default MyApp;
