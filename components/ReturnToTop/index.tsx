import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";

const ReturnToTop = () => {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                if (!display) {
                    setDisplay(true);
                }
            } else {
                if (display) {
                    setDisplay(false);
                }
            }
        };
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [display]);

    return display ? (
        <Link
            sx={{
                position: "fixed",
                bottom: "25px",
                right: "25px",
                background: "rgba(0, 0, 0, 0.2)",
                width: "40px",
                height: "40px",
                textDecoration: "none",
                borderRadius: "100%",
                zIndex: 4,
                transition: "all 0.3s ease-in-out",
                "& svg": {
                    color: "#fff",
                    margin: 0,
                    position: "relative",
                    left: "13px",
                    top: "9px",
                    fontSize: "16px",
                    transform: "translateY(0px)",
                    transition: "all 0.1s ease-in-out",
                },
                "&:hover": {
                    background: "#FF4C60",
                },
            }}
            href="#home"
        >
            <FontAwesomeIcon icon={["fas", "arrow-up"]} />
        </Link>
    ) : (
        <></>
    );
};

export default ReturnToTop;
