import axios from "axios";
import { useEffect, useState } from "react";
import { logDev } from "utils/logs";

function GetInfoPage() {
    const [img, setImg] = useState("");
    useEffect(() => {
        const xx = async () => {
            axios.get("/api/hufi/get-info", { responseType: "arraybuffer" }).then((res) => {
                const datajpg = `data:image/jpg;base64,${btoa(String.fromCharCode(...new Uint8Array(res.data)))}`;
                logDev("_____", datajpg);

                setImg(datajpg);
            });
        };
        xx();
    }, []);

    return (
        <div>
            <img src={img}></img>
        </div>
    );
}

export default GetInfoPage;
