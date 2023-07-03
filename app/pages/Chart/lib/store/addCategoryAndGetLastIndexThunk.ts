import { categoryActions } from './categorySlice';

export const addCategoryAndGetLastIndexThunk = () => async (dispatch, getState) => {
  dispatch(categoryActions.handleAddCategory());
  const lastIndex = getState().category;
  return lastIndex[lastIndex.length - 1].index as number;
};
