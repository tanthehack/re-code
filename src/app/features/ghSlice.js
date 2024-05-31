import { createSlice } from "@reduxjs/toolkit";
import { Storage } from "../storage";

export const TOKEN = "TOKEN";
export const USER = "USER-STATE";

const ghAuthSlice = createSlice({
    name: 'ghauth',
    initialState: {
        token: null,
        user: null,
    },

    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;

            Storage.setItem(USER, user);
            Storage.setItem(TOKEN, token);
        },

        logOut: (state) => {
            state.token = null;
            state.user = null;

            Storage.removeItem(USER, null);
            Storage.removeItem(TOKEN, null);
        }
    }
})

export const { setCredentials, logOut } = ghAuthSlice.actions;
export default ghAuthSlice.reducer;

export const selectCurrentToken = (state) => state.ghauth.token;