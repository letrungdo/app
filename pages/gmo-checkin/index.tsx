import { Player } from "@lottiefiles/react-lottie-player";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Skeleton,
    Stack,
    TextareaAutosize,
    Tooltip,
} from "@mui/material";
import Layout, { PageMeta } from "components/Layout";
import { GMO_CHECKIN_LOGIN_SESSION_COOKIE } from "constants/app";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setToast } from "redux/appSlice";
import { checkin } from "services/gmo-checkin";

const pageMeta: PageMeta = {
    title: "GMO auto checkin - checkout",
    description: "GMO auto checkin - checkout",
};

const emojiData = [
    {
        value: "5",
        icon: "https://assets1.lottiefiles.com/packages/lf20_ply8ftem.json",
        name: "Tuyệt vời",
    },
    {
        value: "4",
        icon: "https://assets1.lottiefiles.com/packages/lf20_2rcvjuse.json",
        name: "Phấn khởi",
    },
    {
        value: "3",
        icon: "https://assets1.lottiefiles.com/packages/lf20_hntzagxx.json",
        name: "Bình thường",
    },
    {
        value: "2",
        icon: "https://assets10.lottiefiles.com/packages/lf20_s1u9tqu9.json",
        name: "Hơi mệt",
    },
    {
        value: "1",
        icon: "https://assets2.lottiefiles.com/packages/lf20_k6hrfq79.json",
        name: "Uể oải",
    },
];

function GmoCheckinPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [emoji, setEmoji] = React.useState("3");
    const cmtRef = useRef<HTMLTextAreaElement>(null);
    const [loading, setLoading] = React.useState<"checkin" | "checkout" | "">("");
    const [lsCookie, setLsCookie] = useState("");

    useEffect(() => {
        const lsCookie = jsCookie.get(GMO_CHECKIN_LOGIN_SESSION_COOKIE) as string;
        if (lsCookie) {
            setLsCookie(lsCookie);
        } else {
            router.push("/gmo-checkin/login");
        }
    }, [router]);

    const handleEmojiChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setEmoji(value);
    };

    const handleCheckin = useCallback(
        async (type: "checkin" | "checkout") => {
            setLoading(type);
            const body = {
                type,
                emoji,
                comment: cmtRef.current?.value ?? "",
            };
            const res = await checkin(lsCookie, body);
            setLoading("");
            if (!res.errorCode) {
                dispatch(setToast({ message: "Success!", open: true, severity: "success" }));

                return;
            }
            switch (res.errorCode) {
                case 400:
                    dispatch(setToast({ message: `${JSON.stringify(res.response)}`, open: true, severity: "error" }));
                    break;
                case 302:
                case 500:
                    dispatch(setToast({ message: `${res.message}`, open: true, severity: "error" }));
                    router.push("/gmo-checkin/login");
                    break;
                default:
                    dispatch(setToast({ message: `${res.message}`, open: true, severity: "error" }));
            }
        },
        [dispatch, emoji, lsCookie, router]
    );

    return (
        <Layout meta={pageMeta}>
            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                {lsCookie ? (
                    <>
                        <FormControl component="fieldset" sx={{ mb: 4 }}>
                            <FormLabel
                                component="legend"
                                color="info"
                                sx={{ textAlign: "center", fontSize: "2rem", mb: 4 }}
                            >
                                Bạn cảm thấy tinh thần thế nào?
                            </FormLabel>
                            <RadioGroup row sx={{ flexWrap: "nowrap" }} value={emoji} onChange={handleEmojiChange}>
                                {emojiData.map((e) => (
                                    <Tooltip title={e.name} key={e.value} placement="bottom" arrow enterTouchDelay={0}>
                                        <FormControlLabel
                                            sx={{ mx: 1 }}
                                            value={e.value}
                                            control={<Radio />}
                                            labelPlacement="top"
                                            label={
                                                <Player
                                                    autoplay
                                                    loop
                                                    src={e.icon}
                                                    style={{ height: "5rem", width: "5rem" }}
                                                />
                                            }
                                        />
                                    </Tooltip>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <TextareaAutosize
                            placeholder="Để lại bình luận"
                            style={{
                                textAlign: "center",
                                width: "100%",
                                maxWidth: 600,
                                padding: 10,
                                fontSize: "1.8rem",
                                fontFamily: "inherit",
                            }}
                            ref={cmtRef}
                        />
                        <Box
                            sx={{
                                marginTop: 4,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                justifyContent: "center",
                            }}
                        >
                            <LoadingButton
                                loading={loading === "checkin"}
                                variant="outlined"
                                color="success"
                                onClick={() => handleCheckin("checkin")}
                            >
                                Checkin
                            </LoadingButton>
                            <LoadingButton
                                loading={loading === "checkout"}
                                variant="outlined"
                                color="warning"
                                onClick={() => handleCheckin("checkout")}
                            >
                                Checkout
                            </LoadingButton>
                        </Box>
                    </>
                ) : (
                    <Stack spacing={2} sx={{ width: "100%", maxWidth: 600 }}>
                        <Skeleton variant="text" />
                        <Skeleton variant="rectangular" height={30} />
                        <Skeleton variant="rectangular" height={100} />
                        <Skeleton variant="rectangular" width={250} height={50} sx={{ mx: "auto !important" }} />
                    </Stack>
                )}
            </Box>
        </Layout>
    );
}

export default GmoCheckinPage;
