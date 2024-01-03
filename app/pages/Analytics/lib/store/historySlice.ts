import { createSlice } from '@reduxjs/toolkit';

import type { IHistory, IHistoryState } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IHistoryState = {
  counts: [
    {
      date: '2024-01-01 08:21',
      value: 500,
      originalID: 'countIndex',
      index: '100-A',
      title: 'Debit card',
    },
  ],
  targets: [
    {
      date: '2024-01-01 12:10',
      value: 50,
      originalID: 'targetIndex',
      index: '010-C',
      title: 'Air Jordan 1',
      fromCount: 'countIndex',
    },
  ],
  categories: [
    {
      date: '2024-01-01 01:11',
      value: 10,
      originalID: 'sportIndex',
      index: '001-D',
      title: 'Sport',
      fromCount: 'countIndex',
      note: 'just simple notee',
    },
    {
      date: '2024-01-02 13:11',
      value: 5,
      originalID: 'sportIndex',
      index: '001-DF',
      title: 'Sport',
      fromCount: 'countIndex',
      note: 'just simple notee',
    },
    {
      date: '2024-01-01 02:11',
      value: 103,
      originalID: 'busIndex',
      index: '001-DA',
      title: 'Bus',
      fromCount: 'countIndex',
      note: 'just simple notee',
    },
    {
      date: '2023-12-21 09:03',
      value: 600,
      originalID: 'foodIndex',
      index: '001-EW',
      title: 'Food',
      fromCount: 'countIndex',
      note: 'another notee',
    },
    {
      date: '2024-01-01 09:03',
      value: 600,
      originalID: 'foodIndex',
      index: '001-E',
      title: 'Food',
      fromCount: 'countIndex',
      note: 'another notee',
    },
  ],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    appendCountHistory: (state, action: PayloadAction<IHistory>) => {
      state.counts.push(action.payload);
    },
    removeCountHistory: (state, action: PayloadAction<{ index: string }>) => ({
      targets: state.targets,
      categories: state.categories,
      counts: state.counts.filter((item) => item.index !== action.payload.index),
    }),
    appendTargetHistory: (state, action: PayloadAction<IHistory>) => {
      state.targets.push(action.payload);
    },
    removeTargetHistory: (state, action: PayloadAction<{ index: string }>) => ({
      targets: state.targets.filter((item) => item.index !== action.payload.index),
      categories: state.categories,
      counts: state.counts,
    }),
    appendCategoryHistory: (state, action: PayloadAction<IHistory>) => {
      state.categories.push(action.payload);
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
