import React, {useEffect} from 'react';
import "./CategoryPage.scss";

import MealList from '../../components/Meal/MealList';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { startFetchMealByCategory } from '../../redux/meals/mealSlice';

const CategoryPage = () => {
  const {name} = useParams();
  const dispatch = useDispatch()

  // const { categoryMeals, dispatch, categories } = useMealContext();
  const {  categoryMeals, categories } = useSelector(
    (state) => ({ ...state.mealsSlice })
  );

  console.log(categoryMeals)
  console.log(categories)

  let catDescription = "";

  if(categories){
    categories?.categories?.forEach(category => {
      if(category?.strCategory === name) catDescription = category?.strCategoryDescription;
    })
  }

  useEffect(() => {
   dispatch(startFetchMealByCategory(name));
  }, [name]);



  return (
    <main className='main-content py-5'>
      <div className='container'>
        <div className='cat-description px-4 py-4'>
          <h2 className='text-orange fw-8'>{name}</h2>
          <p className='fs-18 op-07'>{catDescription}</p>
        </div>
      </div>
      {
        (categoryMeals?.meals?.length) ? <MealList meals = { categoryMeals } /> : null
      }
    </main>
  )
}

export default CategoryPage
