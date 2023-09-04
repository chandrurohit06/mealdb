import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios"
// routes
import {
  CATEGORIES_URL,
  MEAL_CATEGORIES_URL,
  MEAL_SINGLE_URL,
  SEARCH_URL,
} from "../../utils/constants";

// ---------------------------------------------------------------------------------

export const startFetchCategories = createAsyncThunk(
  "fetch/getCategories",
  async () => {
    return axios.get(CATEGORIES_URL);
  }
);

export const startFetchSingleMeal = createAsyncThunk(
  "fetch/getSingleMeal",
  async (id) => {
    return axios.get(`${MEAL_SINGLE_URL}${id}`);
  }
);

export const startFetchMealByCategory = createAsyncThunk(
  "fetch/fetchMealByCategory",
  async (category) => {
    return axios.get(`${MEAL_CATEGORIES_URL}${category}`);
  }
);

export const startFetchMealsBySearch = createAsyncThunk(
  "fetch/getMealBySearch",
  async (searchTerm) => {
    return axios.get(`${SEARCH_URL}${searchTerm}`);
  }
);

// export const startFetchCategories = async(dispatch) => {
//   try{
//       dispatch({ type: FETCH_CATEGORY_BEGIN});
//       const response = await axios.get(`${CATEGORIES_URL}`);
//       dispatch({type: FETCH_CATEGORY_SUCCESS, payload: response.data.categories});
//   } catch(error){
//       dispatch({ type: FETCH_CATEGORY_ERROR, payload: error.message});
//   }
// }

// export const startFetchSingleMeal = async(dispatch, id) => {
//   try{
//       dispatch({ type: FETCH_SINGLE_MEAL_BEGIN});
//       const response = await axios.get(`${MEAL_SINGLE_URL}${id}`);
//       dispatch({type: FETCH_SINGLE_MEAL_SUCCESS, payload: response.data.meals});
//   } catch(error){
//       dispatch({ type: FETCH_SINGLE_MEAL_ERROR, payload: error.message});
//   }
// }

// export const startFetchMealByCategory = async(dispatch, category) => {
//   try{
//       dispatch({type: FETCH_CATEGORY_MEALS_BEGIN});
//       const response = await axios.get(`${MEAL_CATEGORIES_URL}${category}`);
//       dispatch({type: FETCH_CATEGORY_MEALS_SUCCESS, payload: response.data.meals})
//   } catch(error){
//       dispatch({ type: FETCH_CATEGORY_MEALS_ERROR, payload: error.message});
//   }
// }

// export const startFetchMealsBySearch = async(dispatch, searchTerm) => {
//   try{
//       dispatch({ type: FETCH_MEALS_BEGIN});
//       const response = await axios.get(`${SEARCH_URL}${searchTerm}`);
//       dispatch({ type: FETCH_MEALS_SUCCESS, payload: response.data.meals});
//   } catch(error){
//       dispatch({type: FETCH_MEALS_ERROR, payload: error.message});
//   }
// }

// ---------------------------------------------------------------------------------

const mealSlice = createSlice({
  name: "meals",
  initialState: {
    categories: [],
    categoryLoading: false,
    categoryError: false,
    categoryMeals: [],
    categoryMealsLoading: false,
    categoryMealsError: false,
    meals: [],
    mealsLoading: false,
    mealsError: false,
    meal: [],
    mealLoading: false,
    mealError: false,
    message: "",
    errMessage: "",
  },
  reducers: {
    resetMessage: (state) => {
      state.message = "";
    },
    resetErrMessage: (state) => {
      state.errMessage = "";
    },
    rowSelect: (state, action) => {
      state.selectedData = action?.payload.length > 0 && action?.payload[0];
    },
  },
  extraReducers: {
    [startFetchCategories.pending]: (state, action) => {
      state.categoryLoading = true;
    },
    [startFetchCategories.fulfilled]: (state, action) => {
      state.categoryLoading = false;
      state.categories = action?.payload?.data;
    },
    [startFetchCategories.rejected]: (state, action) => {
      state.categoryLoading = false;
      state.categoryError = true;
    },

    [startFetchSingleMeal.pending]: (state, action) => {
      state.mealLoading = true;
    },
    [startFetchSingleMeal.fulfilled]: (state, action) => {
      state.mealLoading = false;
      state.meal = action?.payload?.data;
    },
    [startFetchSingleMeal.rejected]: (state, action) => {
      state.mealLoading = false;
      state.mealError = true;
    },


    [startFetchMealByCategory.pending]: (state, action) => {
      state.categoryMealsLoading = true;
    },
    [startFetchMealByCategory.fulfilled]: (state, action) => {
      state.categoryMealsLoading = false;
      state.categoryMeals = action?.payload?.data;
    },
    [startFetchMealByCategory.rejected]: (state, action) => {
      state.categoryMealsLoading = false;
      state.categoryMealsError = true;
    },

    [startFetchMealsBySearch.pending]: (state, action) => {
      state.categoryMealsLoading = true;
    },
    [startFetchMealsBySearch.fulfilled]: (state, action) => {
      state.categoryMealsLoading = false;
      state.categoryMeals = action?.payload?.data;
    },
    [startFetchMealsBySearch.rejected]: (state, action) => {
      state.categoryMealsLoading = false;
      state.mealsError = true;
    },
  },
});

export const { resetMessage, resetErrMessage, rowSelect } = mealSlice.actions;

export default mealSlice.reducer;
