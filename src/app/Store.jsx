import { configureStore } from "@reduxjs/toolkit";

import mealReducer from "../redux/meals/MealSlice"

//redux store 

export const store = configureStore({
    reducer :{
     mealsSlice : mealReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
