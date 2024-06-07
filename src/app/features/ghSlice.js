import { createSlice } from "@reduxjs/toolkit";
import { Storage } from "../storage";

export const TOKEN = "TOKEN";
export const USER = "USER-STATE";
export const INSID = "INSID"

const token = window ? Storage.getItem(TOKEN) : null;
const user = window ? Storage.getItem(USER) : null;
const installationId = window ? Storage.getItem(INSID) : null;

const ghAuthSlice = createSlice({
    name: "auth",

    initialState: {
        token: null,
        user: null,
    },

    reducers: {
        setCredentials: (state, action) => {
            const { token, user, installationId } = action.payload;
            state.token = token;
            state.user = user;
            state.installationId = installationId;

            Storage.setItem(USER, user);
            Storage.setItem(TOKEN, token);
            Storage.setItem(INSID, installationId)
        },

        logOut: (state) => {
            state.token = null;
            state.user = null;
            state.installationId = null;

            Storage.removeItem(USER, null);
            Storage.removeItem(TOKEN, null);
            Storage.removeItem(INSID, null)
        }
    }
})

export const { setCredentials, logOut } = ghAuthSlice.actions;
export default ghAuthSlice.reducer;

export const selectCurrentUser = () => user
export const selectCurrentToken = () => token
export const selectInstallationId = () => installationId