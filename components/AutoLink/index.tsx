import { Link, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import NextLink from "next/link";
import { isInteralLink } from "utils";

type Props = {
    href: string;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
};

const AutoLink = ({ sx, href, children }: Props) => (
    <>
        {isInteralLink(href) ? (
            <Link component={NextLink} sx={sx} href={href}>
                {children}
            </Link>
        ) : (
            <Link href={href} sx={sx} target="_blank" rel="noopener noreferrer">
                {children}
            </Link>
        )}
    </>
);

export default AutoLink;
