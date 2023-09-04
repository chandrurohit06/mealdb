import { configureStore } from "@reduxjs/toolkit";

import mealReducer from "../redux/meals/MealSlice"

export const store = configureStore({
    reducer :{
     mealsSlice : mealReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
