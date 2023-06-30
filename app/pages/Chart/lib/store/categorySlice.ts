import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { makeid } from '../../../../shared/lib/utils/generateID';
import { getRandomColor } from '../helpers/getRandomColor';

import type { ICategory } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategory[] = [
  {
    index: makeid(),
    title: 'Sport',
    count: 0,
    icon: 'ios-basketball',
    color: '#0E7FC0',
    percent: 0,
    history: [
      {
        date: moment().format('YYYY-MM-DD'),
        value: 0,
      },
    ],
  },
  {
    index: makeid(),
    title: 'House',
    count: 0,
    icon: 'home',
    color: '#09BD0F',
    percent: 0,
    history: [
      {
        date: moment().format('YYYY-MM-DD'),
        value: 0,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Subway',
    count: 0,
    icon: 'subway',
    color: '#CCD50F',
    percent: 0,
    history: [
      {
        date: moment().format('YYYY-MM-DD'),
        value: 0,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Games',
    count: 0,
    icon: 'game-controller',
    color: '#E09B11',
    percent: 0,
    history: [
      {
        date: moment().format('YYYY-MM-DD'),
        value: 0,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Cafe',
    count: 0,
    icon: 'cafe',
    color: '#E05311',
    percent: 0,
    history: [
      {
        date: moment().format('YYYY-MM-DD'),
        value: 0,
      },
    ],
  },
  {
    index: makeid(),
    title: 'Weekends',
    count: 0,
    icon: 'airplane',
    color: '#6511E0',
    percent: 0,
    history: [
      {
        date: moment().format('YYYY-MM-DD'),
        value: 0,
      },
    ],
  },
];

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    handleAddCategory: (state) => {
      state.push({
        index: makeid(),
        title: 'Tests',
        count: 0,
        icon: 'flask',
        color: getRandomColor(),
        percent: 0,
        history: [
          {
            date: moment().format('YYYY-MM-DD'),
            value: 0,
          },
        ],
      });
    },
    handleDeleteCategory: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),
    handleChangeCountCategory: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const categoryToChange = state.find((item) => item.index === action.payload.index);
      categoryToChange!.count = action.payload.count;
      return state;
    },
    handleChangeCategoryTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      categoryToChange!.title = action.payload.title;
      return state;
    },
    handleTopUpCategory: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      categoryToChange!.count += action.payload.value;
      categoryToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        value: action.payload.value,
      });
      return state;
    },
    handleChangeCategoryColor: (state, action: PayloadAction<{ index: string; color: string }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      categoryToChange!.color = action.payload.color;
      return state;
    },
    handleChangeCategoryIcon: (state, action: PayloadAction<{ index: string; icon: string }>) => {
      const categoryToChange = state.find((count) => count.index === action.payload.index);
      categoryToChange!.icon = action.payload.icon;
      return state;
    },
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
