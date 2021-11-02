import { AlertColor } from "@mui/material";
import { useState } from "react";

export const useSnackbar = () => {
    const [toast, setToast] = useState<{ severity?: AlertColor; message?: string; open?: boolean }>({});

    const handleClose = () => {
        setToast({ ...toast, open: false });
    };

    return [toast, setToast, handleClose] as const;
};
