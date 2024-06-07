import { configureStore } from "@reduxjs/toolkit";
import { ghApi } from "./services/ghApi";
import authReducer from "./features/ghSlice";

export const store = configureStore({
    reducer: {
        [ghApi.reducerPath]: ghApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ghApi.middleware),
    devTools: true,
});