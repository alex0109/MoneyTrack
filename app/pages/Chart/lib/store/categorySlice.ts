import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import { db_key } from '../../../../shared/lib/constants/DB_KEY';
import { root_url } from '../../../../shared/lib/constants/REF_URL';

import { colorsArray, iconsArray } from './propertires';

import type { CategoryState, ICategory } from '../types/interfaces';

const initialState: CategoryState = {
  data: [],
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
      if (error.toJSON().message === 'Network Error') {
        console.log('No Internet');
      }
      return rejectWithValue('Server error');
    }
  }
);

export const addNewCategory = createAsyncThunk<ICategory, string, { rejectValue: string }>(
  'categories/addNewCategory',
  async function (uid, { rejectWithValue }) {
    try {
      const newCategory = {
        title: 'New Category',
        count: 0,
        icon: iconsArray[Math.floor(Math.random() * iconsArray.length)],
        color: colorsArray[Math.floor(Math.random() * colorsArray.length)],
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
        count: category.count + categoryChanges.categoryValue,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter((category) => category.index !== action.payload);
      })
      .addCase(changeCategoryTitle.fulfilled, (state, action) => {
        const categoryToChange = state.data.find(
          (category) => category.index == action.payload.categoryID
        );
        if (categoryToChange) {
          categoryToChange.title = action.payload.categoryTitle;
        }
      })
      .addCase(changeCategoryColor.fulfilled, (state, action) => {
        const categoryToChange = state.data.find(
          (category) => category.index == action.payload.categoryID
        );
        if (categoryToChange) {
          categoryToChange.color = action.payload.categoryColor;
        }
      })
      .addCase(changeCategoryIcon.fulfilled, (state, action) => {
        const categoryToChange = state.data.find(
          (category) => category.index == action.payload.categoryID
        );
        if (categoryToChange) {
          categoryToChange.icon = action.payload.categoryIcon;
        }
      })
      .addCase(topUpCategoryCount.fulfilled, (state, action) => {
        const categoryToChange = state.data.find(
          (count) => action.payload.categoryID === count.index
        );
        if (categoryToChange) {
          categoryToChange.count = categoryToChange.count + action.payload.categoryValue;
          categoryToChange.history = [
            ...categoryToChange.history,
            {
              date: moment().format('YYYY-MM-DD'),
              value: action.payload.categoryValue,
            },
          ];
        }
      });
  },
});

export const categoryReducer = categorySlice.reducer;
export const categoryActions = categorySlice.actions;
