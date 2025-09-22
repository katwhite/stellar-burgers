import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  selectIngredients
} from '../../slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);

  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
