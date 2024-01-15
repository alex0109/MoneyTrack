import { createSlice } from '@reduxjs/toolkit';

import { makeid } from '../../../../shared/lib/utils/generateID';

import { type ICategory } from '../types/interfaces';

import { colorsArray, iconsArray } from './propertires';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategory[] = [];

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoriesData: (state, action: PayloadAction<ICategory[]>) => action.payload,
    addNewCategory: (state, action: PayloadAction<{ title: string }>) => {
      state.push({
        index: makeid(),
        title: action.payload.title,
        count: 0,
        icon: iconsArray[Math.floor(Math.random() * iconsArray.length)],
        color: colorsArray[Math.floor(Math.random() * colorsArray.length)],
        percent: 0,
      });
    },
    deleteCategory: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),
    changeCategoryTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      if (categoryToChange) {
        categoryToChange.title = action.payload.title;
        return state;
      }
    },
    changeCategoryColor: (state, action: PayloadAction<{ index: string; color: string }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      if (categoryToChange) {
        categoryToChange.color = action.payload.color;
        return state;
      }
    },
    changeCategoryIcon: (state, action: PayloadAction<{ index: string; icon: string }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      if (categoryToChange) {
        categoryToChange.icon = action.payload.icon;
        return state;
      }
    },
    topUpCategoryCount: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const categoryToChange = state.find((item) => item.index === action.payload.index);
      if (categoryToChange && action.payload.count > 0) {
        categoryToChange.count = categoryToChange.count + action.payload.count;
        return state;
      }
    },
    decreaseCategoryCount: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const categoryToChange = state.find((item) => item.index === action.payload.index);
      if (categoryToChange && action.payload.count > 0) {
        categoryToChange.count = categoryToChange.count - action.payload.count;
        return state;
      }
    },
  },
  extraReducers: () => {},
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
