import { Box } from "@mui/system";
import config from "config/site";
import Head from "next/head";
import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

export type PageMeta = {
    title: string;
    description?: string;
    image?: string;
    type?: "article";
};

type Props = {
    children?: ReactNode;
    meta: PageMeta;
};

const Layout = ({ children, meta: { title, description = "", image = "", type = "article" } }: Props) => {
    return (
        <>
            <Head>
                <title>{`${title} - ${config.siteTitle}`}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, width=device-width" />
                <meta property="og:title" content={`${title} - ${config.siteTitle}`} />
                <meta property="og:description" content={description} />
                <meta name="image" content={image} />
                <meta property="og:image" content={image} />
                <meta property="og:type" content={type} />
            </Head>
            <Header title={title} />
            <Box sx={{ py: "2rem", px: { xs: "1rem", md: "5rem", lg: "15rem", xl: "20rem" }, flex: "1 0 auto" }}>
                {children}
            </Box>
            <Footer socials={config.socialLinks} links={config.footerLinks} copyright={config.copyright} />
        </>
    );
};

export default Layout;
