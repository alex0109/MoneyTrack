import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

import { makeid } from '../../../../shared/lib/utils/generateID';

import type { ITarget } from '../types/interfaces';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ITarget[] = [];

export const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    handleAddTarget: (state) => {
      state.push({
        index: makeid(),
        title: 'New title',
        value: 0,
        target: 0,
        history: [],
      });
    },
    handleDeleteTarget: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),
    handleChangeTargetTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const targetToChange = state.find((target) => target.index === action.payload.index);
      targetToChange!.title = action.payload.title;
      return state;
    },
    handleChangeTarget: (state, action: PayloadAction<{ index: string; target: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      targetToChange!.target = action.payload.target;
      return state;
    },
    handleChangeTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      targetToChange!.value = action.payload.value;
      return state;
    },
    handleTopUpTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      targetToChange!.value = targetToChange!.value + action.payload.value;
      targetToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        value: action.payload.value,
      });
      return state;
    },
    handleDecreaseTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((target) => target.index === action.payload.index);
      if (targetToChange!.value !== 0 && targetToChange!.value >= action.payload.value) {
        targetToChange!.value = targetToChange!.value - action.payload.value;
        return state;
      }
      return state;
    },
  },
});

export const targetReducers = targetSlice.reducer;
export const targetActions = targetSlice.actions;
