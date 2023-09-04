import React, { useEffect, useState } from "react";
import "./HomePage.scss";

import Loader from "../../components/Loader/Loader";
import CategoryList from "../../components/Category/CategoryList";
import NotFound from "../../components/NotFound/NotFound";
import MealList from "../../components/Meal/MealList";
import Search from "../../components/antdcomponents/search";
import { useSelector, useDispatch } from "react-redux";

import {
  startFetchMealsBySearch,
  startFetchSingleMeal,
  startFetchMealByCategory,
} from "../../redux/meals/mealSlice";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    categories,
    meals,
    categoryMeals,
    categoryLoading,
    categoryMealsLoading,
    mealsLoading,
  } = useSelector((state) => ({ ...state.mealsSlice }));

  const dispatch = useDispatch();

  console.log(categories);
  console.log(categoryMeals);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      dispatch(startFetchMealsBySearch(e.target.value));
    } else {
      let id = localStorage.getItem("mealId");
      dispatch(startFetchMealByCategory("Miscellaneous"));
    }
  };

  useEffect(() => {
    dispatch(startFetchMealByCategory("Miscellaneous"));
  }, []);

  const onChangeSearch = (value) => {};

  console.log( categoryMeals);

  return (
    <main className="main-content">
      <Search
        searchTerm={searchTerm}
        onSearch={onChangeSearch}
        onChange={handleChange}
      />

      {categoryMealsLoading ? (
        <Loader />
      ) : categoryMeals?.meals === null ? (
        <NotFound />
      ) : categoryMeals?.meals?.length ? (
        <MealList meals={categoryMeals} />
      ) : (
        ""
      )}

      {/* { (mealsLoading) ? <Loader /> : (meals === null) ? <NotFound /> : (meals?.length) ? <MealList meals = {meals} /> : "" }
      { (categoryLoading) ? <Loader /> : <CategoryList categories = {categories} /> } */}
    </main>
  );
};

export default HomePage;
