import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

import { makeid } from '../../../../shared/lib/utils/generateID';

import type { IHistoryState } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IHistoryState = {
  counts: [],
  targets: [],
  categories: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    appendCountHistory: (
      state,
      action: PayloadAction<{
        value: number;
        originalID: string;
        title: string;
      }>
    ) => {
      state.counts.push({
        date: moment().format('YYYY-MM-DD HH:mm'),
        index: makeid(),
        value: action.payload.value,
        title: action.payload.title,
        originalID: action.payload.originalID,
      });
    },
    removeCountHistory: (state, action: PayloadAction<{ index: string }>) => ({
      targets: state.targets,
      categories: state.categories,
      counts: state.counts.filter((item) => item.index !== action.payload.index),
    }),
    appendTargetHistory: (
      state,
      action: PayloadAction<{
        value: number;
        originalID: string;
        title: string;
        fromCount: string;
      }>
    ) => {
      state.targets.push({
        date: moment().format('YYYY-MM-DD HH:mm'),
        index: makeid(),
        value: action.payload.value,
        title: action.payload.title,
        originalID: action.payload.originalID,
        fromCount: action.payload.fromCount,
      });
    },
    removeTargetHistory: (state, action: PayloadAction<{ index: string }>) => ({
      targets: state.targets.filter((item) => item.index !== action.payload.index),
      categories: state.categories,
      counts: state.counts,
    }),
    appendCategoryHistory: (
      state,
      action: PayloadAction<{
        value: number;
        originalID: string;
        title: string;
        fromCount: string;
        note?: string;
      }>
    ) => {
      state.categories.push({
        date: moment().format('YYYY-MM-DD HH:mm'),
        index: makeid(),
        value: action.payload.value,
        title: action.payload.title,
        originalID: action.payload.originalID,
        fromCount: action.payload.fromCount,
        note: action.payload.note,
      });
    },
    removeCategoryHistory: (state, action: PayloadAction<{ index: string }>) => ({
      targets: state.targets,
      categories: state.categories.filter((item) => item.index !== action.payload.index),
      counts: state.counts,
    }),
  },
});

export const historyReducer = historySlice.reducer;
export const historyActions = historySlice.actions;
