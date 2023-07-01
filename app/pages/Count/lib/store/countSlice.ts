import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { makeid } from '../../../../shared/lib/utils/generateID';

import type { ICount } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ICount[] = [
  {
    index: makeid(),
    title: 'Credit card',
    value: 0,
    monthIncome: {
      incomeDate: moment().format('YYYY-MM-01'),
      value: 0,
    },
    history: [
      {
        date: moment().format('YYYY-MM-DD'),
        value: 0,
      },
    ],
  },
];

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    handleAddCount: (state) => {
      state.push({
        index: makeid(),
        title: 'New title',
        value: 0,
        monthIncome: {
          incomeDate: moment().format('YYYY-MM-01'),
          value: 0,
        },
        history: [
          {
            date: moment().format('YYYY-MM-DD'),
            value: 0,
          },
        ],
      });
    },
    handleDeleteCount: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),

    handleChangeCountTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.title = action.payload.title;
      return state;
    },
    handleChangeCount: (
      state,
      action: PayloadAction<{ index: string; value: number; historyValue: number }>
    ) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.value = action.payload.value;
      countToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        value: action.payload.historyValue,
      });
      return state;
    },
    handleTopUpCount: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.value = countToChange!.value + action.payload.value;
      countToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        value: action.payload.value,
      });
      return state;
    },
    handleDecreaseCount: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      if (countToChange!.value !== 0 && countToChange!.value >= action.payload.value) {
        countToChange!.value = countToChange!.value - action.payload.value;
        return state;
      }
      return state;
    },
    handleMonthIncome: (state, action: PayloadAction<{ index: string }>) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.value += countToChange!.monthIncome.value;
      countToChange!.monthIncome.incomeDate = moment(countToChange!.monthIncome.incomeDate)
        .add(1, 'month')
        .format('YYYY-MM-DD');
      countToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        value: countToChange!.monthIncome.value,
      });

      return state;
    },
    handleChangeMonthIncomeValue: (
      state,
      action: PayloadAction<{ index: string; value: number }>
    ) => {
      const countToChange = state.find((count) => count.index === action.payload.index);
      countToChange!.monthIncome.value = action.payload.value;

      return state;
    },
  },
});

export const countReducers = countSlice.reducer;
export const countActions = countSlice.actions;
