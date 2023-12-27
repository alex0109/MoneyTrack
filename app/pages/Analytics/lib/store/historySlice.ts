import { createSlice } from '@reduxjs/toolkit';

import type { IHistory, IHistoryState } from '../types/interfaces';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IHistoryState = {
  counts: [
    {
      date: '2023-12-26 14:23',
      value: 100,
      originalID: '111',
      index: '100-A',
      title: 'Credit',
    },
    {
      date: '2023-12-26 11:32',
      value: 50,
      originalID: '222',
      index: '100-B',
      title: 'Cash',
    },
  ],
  targets: [
    {
      date: '2023-12-26 17:16',
      value: 50,
      originalID: 'AA',
      index: '010-C',
      title: 'New watches',
      fromCount: '11',
    },
  ],
  categories: [
    {
      date: '2023-12-23 01:11',
      value: 10,
      originalID: 'AAA',
      index: '001-D',
      title: 'Sport',
      fromCount: '1',
      note: 'just simple notee',
    },
    {
      date: '2023-12-23 02:11',
      value: 103,
      originalID: 'AAA',
      index: '001-DA',
      title: 'Sport',
      fromCount: '1',
      note: 'just simple notee',
    },
    {
      date: '2023-12-26 09:03',
      value: 600,
      originalID: 'BBB',
      index: '001-E',
      title: 'Barbershop',
      fromCount: '1',
      note: 'another notee',
    },
    {
      date: '2023-11-27 07:01',
      value: 70,
      originalID: 'CCC',
      index: '001-F',
      title: 'Subway',
      fromCount: '11',
      note: 'another notee',
    },
    {
      date: '2023-12-27 11:27',
      value: 200,
      originalID: 'DDD',
      index: '001-G',
      title: 'Shop',
      fromCount: '1',
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
