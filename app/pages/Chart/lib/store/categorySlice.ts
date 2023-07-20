import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import { db_key } from '../../../../shared/lib/constants/DB_KEY';
import { root_url } from '../../../../shared/lib/constants/REF_URL';
import { makeid } from '../../../../shared/lib/utils/generateID';
import { getRandomColor } from '../helpers/getRandomColor';

import type { CategoryState, ICategory } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: CategoryState = {
  data: [
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
  ],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<ICategory[], string, { rejectValue: string }>(
  'categories/fetchCategories',
  async function (uid, { rejectWithValue }) {
    try {
      const response = await axios.get(`${root_url}/users/${uid}/categories.json?auth=${db_key}`);

      const data = Object.entries(response.data).map(([key, value]) => ({
        ...value,
        index: key,
      }));

      return data;
    } catch (error) {
      return rejectWithValue('Server error');
    }
  }
);

export const addNewCategory = createAsyncThunk<ICategory, string, { rejectValue: string }>(
  'categories/addNewCategory',
  async function (uid, { rejectWithValue }) {
    try {
      const newCategory = {
        index: '',
        title: 'New Category',
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
      };
      const response = await axios.post(
        `${root_url}/users/${uid}/categories.json?auth=${db_key}`,
        newCategory
      );

      newCategory.index = response.data.name;

      return newCategory;
    } catch (error) {
      return rejectWithValue('Server error');
    }
  }
);

export const deleteCategory = createAsyncThunk<
  string,
  { uid: string; categoryID: string },
  { rejectValue: string }
>('categories/deleteCategory', async function (categoryChanges, { rejectWithValue }) {
  try {
    await axios.delete(
      `${root_url}/users/${categoryChanges.uid}/categories/${categoryChanges.categoryID}.json?auth=${db_key}`
    );

    return categoryChanges.categoryID;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeCategoryTitle = createAsyncThunk<
  { categoryID: string; categoryTitle: string },
  { uid: string; categoryID: string; categoryTitle: string },
  { rejectValue: string }
>('categories/changeCategoryTitle', async function (categoryChanges, { rejectWithValue }) {
  try {
    await axios.patch(
      `${root_url}/users/${categoryChanges.uid}/categories/${categoryChanges.categoryID}.json?auth=${db_key}`,
      { title: categoryChanges.categoryTitle }
    );

    return categoryChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeCategoryCount = createAsyncThunk<
  { categoryID: string; categoryCount: string },
  { uid: string; categoryID: string; categoryCount: string },
  { rejectValue: string }
>('categories/changeCategoryCount', async function (categoryChanges, { rejectWithValue }) {
  try {
    await axios.patch(
      `${root_url}/users/${categoryChanges.uid}/categories/${categoryChanges.categoryID}.json?auth=${db_key}`,
      { count: categoryChanges.categoryCount }
    );

    return categoryChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeCategoryColor = createAsyncThunk<
  { categoryID: string; categoryColor: string },
  { uid: string; categoryID: string; categoryColor: string },
  { rejectValue: string }
>('categories/changeCategoryColor', async function (categoryChanges, { rejectWithValue }) {
  try {
    await axios.patch(
      `${root_url}/users/${categoryChanges.uid}/categories/${categoryChanges.categoryID}.json?auth=${db_key}`,
      { color: categoryChanges.categoryColor }
    );

    return categoryChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeCategoryIcon = createAsyncThunk<
  { categoryID: string; categoryIcon: string },
  { uid: string; categoryID: string; categoryIcon: string },
  { rejectValue: string }
>('categories/changeCategoryIcon', async function (categoryChanges, { rejectWithValue }) {
  try {
    await axios.patch(
      `${root_url}/users/${categoryChanges.uid}/categories/${categoryChanges.categoryID}.json?auth=${db_key}`,
      { icon: categoryChanges.categoryIcon }
    );

    return categoryChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const topUpCategoryCount = createAsyncThunk<
  { categoryID: string; categoryValue: number },
  { uid: string; categoryID: string; categoryValue: number },
  { rejectValue: string; state: CategoryState }
>('categories/topUpCategoryCount', async function (categoryChanges, { rejectWithValue, getState }) {
  const category = getState().category.data.find(
    (category) => category.index === categoryChanges.categoryID
  );

  const newHistoryItem = {
    date: moment().format('YYYY-MM-DD'),
    value: categoryChanges.categoryValue,
  };

  try {
    await axios.patch(
      `${root_url}/users/${categoryChanges.uid}/categories/${categoryChanges.categoryID}.json?auth=${db_key}`,
      {
        count: category.value + categoryChanges.categoryValue,
        history: [...category.history, newHistoryItem],
      }
    );

    return categoryChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    handleAddCategory: (state) => {
      state.data.push({
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
    handleDeleteCategory: (state, action: PayloadAction<{ index: string }>) => {
      state.data.filter((item) => item.index !== action.payload.index);
    },
    handleChangeCountCategory: (state, action: PayloadAction<{ index: string; count: number }>) => {
      const categoryToChange = state.data.find((item) => item.index === action.payload.index);
      categoryToChange!.count = action.payload.count;
      return state;
    },
    handleChangeCategoryTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const categoryToChange = state.data.find((count) => count.index === action.payload.index);
      categoryToChange!.title = action.payload.title;
      return state;
    },
    handleTopUpCategory: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const categoryToChange = state.data.find((count) => count.index === action.payload.index);
      categoryToChange!.count += action.payload.value;
      categoryToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        value: action.payload.value,
      });
      return state;
    },
    handleChangeCategoryColor: (state, action: PayloadAction<{ index: string; color: string }>) => {
      const categoryToChange = state.data.find((count) => count.index === action.payload.index);
      categoryToChange!.color = action.payload.color;
      return state;
    },
    handleChangeCategoryIcon: (state, action: PayloadAction<{ index: string; icon: string }>) => {
      const categoryToChange = state.data.find((count) => count.index === action.payload.index);
      categoryToChange!.icon = action.payload.icon;
      return state;
    },
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
