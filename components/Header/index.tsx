import { Hidden, List, ListItem, SwipeableDrawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "assets/images/logo192.webp";
import AutoLink from "components/AutoLink";
import HambugerMenu from "components/HambugerMenu";
import siteConfig from "config/site";
import { ROOT_ROUTE } from "constants/routePath";
import NextImage from "next/image";
import SingletonRouter from "next/router";
import React, { useState } from "react";

type Props = {
    title: string;
};

const onClickLogo = () => {
    SingletonRouter.push(ROOT_ROUTE);
};

const Header = ({ title }: Props) => {
    const [isOpenMenu, setOpenMenu] = useState(false);
    const onMenuClick = (open: boolean) => () => {
        setOpenMenu(open);
    };
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        onMenuClick(open)();
    };
    const onClickLinkMobile = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        toggleDrawer(false)(ev);
    };

    return (
        <Box
            component="header"
            sx={{
                py: "1rem",
                px: { xs: "1rem", md: "5rem", lg: "15rem", xl: "20rem" },
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                boxShadow: "inset 0 -1px 0 0 #fff, 0 1px 5px rgb(0 0 0 / 10%)",
            }}
        >
            <NextImage
                className="logo border-radius cursor-pointer"
                width={32}
                height={32}
                src={Logo}
                alt="TĐ.VN"
                onClick={onClickLogo}
            />
            <Typography variant="h4" className="ml-1 text-nowrap m-0">
                {title}
            </Typography>
            <Hidden only={["xs", "sm"]}>
                <Box sx={{ marginLeft: "auto", display: "flex", gap: "2rem" }}>
                    {siteConfig.sidebarLinks.map((tab) => (
                        <AutoLink key={tab.url} href={tab.url}>
                            {tab.label}
                        </AutoLink>
                    ))}
                </Box>
            </Hidden>
            <Hidden mdUp>
                <HambugerMenu isOpen={isOpenMenu} onClick={onMenuClick(!isOpenMenu)} />
                <SwipeableDrawer
                    id="slide-menu"
                    anchor="right"
                    open={isOpenMenu}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    disableSwipeToOpen
                >
                    <List
                        sx={{
                            marginTop: "4.5rem",
                            "& .MuiListItem-root": {
                                padding: 0,
                            },
                        }}
                        onKeyDown={toggleDrawer(false)}
                    >
                        {siteConfig.sidebarLinks.map((item) => (
                            <ListItem onClick={onClickLinkMobile} button key={item.url}>
                                <AutoLink sx={{ width: "100%", p: "1rem 1.6rem" }} href={item.url}>
                                    {item.label}
                                </AutoLink>
                            </ListItem>
                        ))}
                    </List>
                </SwipeableDrawer>
            </Hidden>
        </Box>
    );
};

export default React.memo(Header);
