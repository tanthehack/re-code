import { configureStore } from "@reduxjs/toolkit";
import { ghApi } from "./services/ghApi";

export const store = configureStore({
    reducer: {
        [ghApi.reducerPath]: ghApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ghApi.middleware),
    devTools: true,
});