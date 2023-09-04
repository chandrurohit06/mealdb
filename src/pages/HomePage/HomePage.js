import React, { useEffect, useState } from "react";
import "./HomePage.scss";
//components
import Loader from "../../components/Loader/Loader";
import CategoryList from "../../components/Category/CategoryList";
import NotFound from "../../components/NotFound/NotFound";
import MealList from "../../components/Meal/MealList";
import Search from "../../components/AntdComponents/Search";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  startFetchMealsBySearch,
  startFetchSingleMeal,
  startFetchMealByCategory,
} from "../../redux/meals/MealSlice";

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

  const onChangeSearch = () => {
    dispatch(startFetchMealsBySearch(searchTerm))
  };

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
    </main>
  );
};

export default HomePage;
