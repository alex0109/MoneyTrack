import { createSlice } from '@reduxjs/toolkit';

import { makeid } from '../../../../shared/lib/utils/generateID';

import type { ITarget } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState: ITarget[] = [];

export const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    setTargetsData: (state, action) => action.payload,
    addNewTarget: (state, action: PayloadAction<{ title: string }>) => {
      state.push({
        index: makeid(),
        title: action.payload.title,
        target: 0,
        value: 0,
        hisory: [],
      });
    },
    deleteTarget: (state, action: PayloadAction<{ index: string }>) =>
      state.filter((item) => item.index !== action.payload.index),

    changeTargetTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      if (targetToChange) {
        targetToChange.title = action.payload.title;
        return state;
      }
    },
    changeTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      if (targetToChange) {
        targetToChange.value = action.payload.value;
        return state;
      }
    },
    changeTarget: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      if (targetToChange) {
        targetToChange.target = action.payload.value;
        return state;
      }
    },
    decreaseTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      if (targetToChange && action.payload.value > 0) {
        targetToChange.value = targetToChange.value - action.payload.value;
        return state;
      }
    },
    topUpTargetValue: (
      state,
      action: PayloadAction<{ index: string; value: number; countIndex: string }>
    ) => {
      const targetToChange = state.find((count) => count.index === action.payload.index);
      if (targetToChange && action.payload.value > 0) {
        targetToChange.value = targetToChange.value + action.payload.value;
        targetToChange.hisory.push({
          index: makeid(),
          date: moment().format('YYYY-MM-DD HH:mm'),
          value: action.payload.value,
          fromCount: action.payload.countIndex,
        });
        return state;
      }
    },
  },
});

export const targetReducers = targetSlice.reducer;
export const targetActions = targetSlice.actions;
