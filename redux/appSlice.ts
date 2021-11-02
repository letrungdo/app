import { AlertColor } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Toast {
    severity?: AlertColor;
    message?: string;
    open?: boolean;
}

export interface AppState {
    toast: Toast;
}

const initialState: AppState = {
    toast: {},
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setToast: (state, action: PayloadAction<Toast>) => {
            state.toast = action.payload;
        },
    },
});

export const { setToast } = appSlice.actions;

export default appSlice.reducer;
