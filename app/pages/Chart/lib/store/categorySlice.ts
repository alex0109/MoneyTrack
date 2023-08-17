import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

import { makeid } from '../../../../shared/lib/utils/generateID';

import { type ICategory } from '../types/interfaces';

import { colorsArray, iconsArray } from './propertires';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategory[] = [];

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoriesData: (state, action) => action.payload,
    addNewCategory: (state, action: PayloadAction<{ title: string }>) => {
      state.push({
        index: makeid(),
        title: action.payload.title,
        count: 0,
        icon: iconsArray[Math.floor(Math.random() * iconsArray.length)],
        color: colorsArray[Math.floor(Math.random() * colorsArray.length)],
        percent: 0,
        history: [],
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
    addCategoryHistory: (
      state,
      action: PayloadAction<{ index: string; value: number; fromCount: string; note: string }>
    ) => {
      const categoryToChange = state.find((item) => item.index === action.payload.index);
      if (categoryToChange) {
        if (!categoryToChange.history) {
          categoryToChange.history = [];
          categoryToChange.history.push({
            index: makeid(),
            title: categoryToChange.title,
            date: moment().format('YYYY-MM-DD hh:mm'),
            value: action.payload.value,
            fromCount: action.payload.fromCount,
            categoryIndex: categoryToChange.index,
            note: action.payload.note,
          });

          return state;
        } else {
          categoryToChange.history.push({
            index: makeid(),
            title: categoryToChange.title,
            date: moment().format('YYYY-MM-DD hh:mm'),
            value: action.payload.value,
            fromCount: action.payload.fromCount,
            categoryIndex: categoryToChange.index,
            note: action.payload.note,
          });

          return state;
        }
      }
    },
    deleteCategoryHistory: (
      state,
      action: PayloadAction<{ index: string; historyIndex: string }>
    ) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);

      if (categoryToChange) {
        for (let i = 0; i < categoryToChange.history.length; i++) {
          if (categoryToChange.history[i].index === action.payload.historyIndex) {
            categoryToChange.history.splice(i, 1);
            return state;
          }
        }
      }
    },
  },
  extraReducers: () => {},
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
