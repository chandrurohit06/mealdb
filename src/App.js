import React, { useEffect } from "react";

import "./App.scss";
// react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import { Home, MealDetails, Error, Category,FinalPage } from "./pages/index";
// components
import Header from "./components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { startFetchMealByCategory } from "./redux/meals/MealSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startFetchMealByCategory("Miscellaneous"));
  }, []);

  return (
    <BrowserRouter>
      <Header />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/meal/category/:name" element={<Category />} />
        <Route path="meal/delivered" element={<FinalPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
