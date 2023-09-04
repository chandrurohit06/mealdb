import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "./MealDetailsPage.scss";

//components
// import { startFetchSingleMeal } from '../../actions/mealsActions';
import CategoryList from '../../components/Category/CategoryList';
import MealSingle from "../../components/Meal/MealSingle";
import Loader from '../../components/Loader/Loader';

//redux
import { startFetchSingleMeal } from '../../redux/meals/MealSlice';
import { useSelector,useDispatch } from 'react-redux';

const MealDetailsPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch()

 
  const {  categories, meal, categoryLoading, mealLoading } = useSelector(
    (state) => ({ ...state.mealsSlice })
  );

  useEffect(() => {
    dispatch(startFetchSingleMeal(id));
    localStorage.setItem("mealId",id)
    
  }, [id]);

  let ingredientsArr = [], measuresArr = [], singleMeal = {};
  let mealData = meal?.meals

  if(meal && mealData?.length > 0){
    for(let props in mealData[0]){
      if(props.includes('strIngredient')){
        if(mealData[0][props]) ingredientsArr.push(mealData[0][props]);
      }

      if(props.includes('strMeasure')){
        if(mealData[0][props]){
          if(mealData[0][props].length > 1){
            measuresArr.push(mealData[0][props]);
          }
        }
      }
    }


    singleMeal = {
      id: mealData[0]?.idMeal,
      title: mealData[0]?.strMeal,
      category: mealData[0]?.strCategory,
      area: mealData[0]?.strArea,
      thumbnail: mealData[0]?.strMealThumb,
      instructions: mealData[0]?.strInstructions,
      source: mealData[0]?.strSource,
      tags: mealData[0]?.strTags,
      youtube: mealData[0]?.strYoutube,
      ingredients: ingredientsArr,
      measures: measuresArr
    }
  }

  return (
    <main className='main-content bg-whitesmoke'>

      { (mealLoading) ? <Loader /> : <MealSingle meal = {singleMeal} /> }
      {/* { (categoryLoading) ? <Loader /> : <CategoryList categories={categories} /> } */}
    </main>
  )
}

export default MealDetailsPage
