import { createSlice } from '@reduxjs/toolkit';

import moment from 'moment';

import { makeid } from '../../../../shared/lib/utils/generateID';

import type { IHistoryState } from '../types/interfaces';
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
