import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/system";
import AutoLink from "components/AutoLink";
import React from "react";

type Props = {
    socials: {
        url: string;
        label: string;
        iconClassName: string;
    }[];
    links: {
        url: string;
        label: string;
    }[];
    copyright: string;
};

const Footer = ({ socials, links, copyright }: Props) => {
    return (
        <Box component="footer" sx={{ backgroundColor: "#1e1e1e", color: "#fff", textAlign: "center", flexShrink: 0 }}>
            <div className="m-2">
                {socials.map((social) => {
                    return (
                        <AutoLink sx={{ mx: "1rem" }} href={social.url} key={social.label}>
                            <FontAwesomeIcon
                                icon={social.iconClassName.split(" ") as IconProp}
                                transform="grow-2"
                                style={{ color: "#FFF" }}
                            />
                        </AutoLink>
                    );
                })}
            </div>
            <div className="m-2">
                {links.map((link) => (
                    <AutoLink
                        key={link.label}
                        href={link.url}
                        sx={{ display: "inline-block", margin: "0 1rem", color: "#fff" }}
                    >
                        {link.label}
                    </AutoLink>
                ))}
            </div>
            <Box component="p" sx={{ color: "#9e9e9e", fontSize: "80%", m: "1rem" }}>
                {copyright}
            </Box>
        </Box>
    );
};

export default Footer;
