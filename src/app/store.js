import { configureStore } from "@reduxjs/toolkit";

import mealReducer from "../redux/meals/mealSlice"

export const store = configureStore({
    reducer :{
     mealsSlice : mealReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})