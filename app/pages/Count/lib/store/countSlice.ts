import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

import { makeid } from '../../../../shared/lib/utils/generateID';

import type { ICount } from '../types/interfaces';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICount[] = [];

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    setCountsData: (state, action) => action.payload,
    addNewCount: (state, action: PayloadAction<{ title: string }>) => {
      state.push({
        index: makeid(),
        title: action.payload.title,
        value: 0,
        history: [],
      });
    },
    deleteCount: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),

    changeCountTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      if (countToChange) {
        countToChange.title = action.payload.title;
        return state;
      }
    },
    changeCountValue: (
      state,
      action: PayloadAction<{ index: string; value: number; historyValue: number }>
    ) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      if (countToChange) {
        countToChange.value = action.payload.value;
        countToChange.history.push({
          date: moment().format('YYYY-MM-DD'),
          value: action.payload.historyValue,
        });
        return state;
      }
    },
    decreaseCountValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      if (countToChange && action.payload.value > 0) {
        countToChange.value = countToChange.value - action.payload.value;
        return state;
      }
    },
    topUpCountValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      if (countToChange && action.payload.value > 0) {
        countToChange.value = countToChange.value + action.payload.value;
        countToChange.history.push({
          date: moment().format('YYYY-MM-DD'),
          value: action.payload.value,
        });
        return state;
      }
    },
  },
  extraReducers: () => {},
});

export const countReducers = countSlice.reducer;
export const countActions = countSlice.actions;
