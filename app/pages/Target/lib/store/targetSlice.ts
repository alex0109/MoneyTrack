import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import moment from 'moment';

import { db_key } from '../../../../shared/lib/constants/DB_KEY';
import { root_url } from '../../../../shared/lib/constants/REF_URL';
import { makeid } from '../../../../shared/lib/utils/generateID';

import type { ITarget, TargetState } from '../types/interfaces';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TargetState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTargets = createAsyncThunk<ITarget[], string, { rejectValue: string }>(
  'targets/fetchTargets',
  async function (uid, { rejectWithValue }) {
    try {
      const response = await axios.get(`${root_url}/users/${uid}/targets.json?auth=${db_key}`);

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

export const addNewTarget = createAsyncThunk<ITarget, string, { rejectValue: string }>(
  'targets/addNewTarget',
  async function (uid, { rejectWithValue }) {
    try {
      const newTarget = {
        index: '',
        title: 'New title',
        target: 0,
        value: 0,
      };
      const response = await axios.post(
        `${root_url}/users/${uid}/targets.json?auth=${db_key}`,
        newTarget
      );

      newTarget.index = response.data.name;

      return newTarget;
    } catch (error) {
      return rejectWithValue('Server error');
    }
  }
);

export const deleteTarget = createAsyncThunk<
  string,
  { uid: string; targetID: string },
  { rejectValue: string }
>('targets/deleteTarget', async function (targetChanges, { rejectWithValue }) {
  try {
    await axios.delete(
      `${root_url}/users/${targetChanges.uid}/targets/${targetChanges.targetID}.json?auth=${db_key}`
    );

    return targetChanges.targetID;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeTargetTitle = createAsyncThunk<
  { targetID: string; targetTitle: string },
  { uid: string; targetID: string; targetTitle: string },
  { rejectValue: string }
>('targets/changeTargetTitle', async function (targetChanges, { rejectWithValue }) {
  try {
    await axios.patch(
      `${root_url}/users/${targetChanges.uid}/targets/${targetChanges.targetID}.json?auth=${db_key}`,
      { title: targetChanges.targetTitle }
    );

    return targetChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeTargetValue = createAsyncThunk<
  { targetID: string; targetValue: number; historyValue: number },
  { uid: string; targetID: string; targetValue: number; historyValue: number },
  { rejectValue: string }
>('targets/changeTargetValue', async function (targetChanges, { rejectWithValue }) {
  try {
    await axios.patch(
      `${root_url}/users/${targetChanges.uid}/targets/${targetChanges.targetID}.json?auth=${db_key}`,
      {
        value: targetChanges.targetValue,
      }
    );

    return targetChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeTarget = createAsyncThunk<
  { targetID: string; target: number; historyValue: number },
  { uid: string; targetID: string; target: number; historyValue: number },
  { rejectValue: string }
>('targets/changeTarget', async function (targetChanges, { rejectWithValue }) {
  try {
    await axios.patch(
      `${root_url}/users/${targetChanges.uid}/targets/${targetChanges.targetID}.json?auth=${db_key}`,
      {
        target: targetChanges.target,
      }
    );

    return targetChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const topUpTargetValue = createAsyncThunk<
  { targetID: string; targetValue: number },
  { uid: string; targetID: string; targetValue: number },
  { rejectValue: string; state: TargetState }
>('tagets/topUpTargetValue', async function (targetChanges, { rejectWithValue, getState }) {
  const target = getState().target.data.find((target) => target.index === targetChanges.targetID);

  try {
    await axios.patch(
      `${root_url}/users/${targetChanges.uid}/targets/${targetChanges.targetID}.json?auth=${db_key}`,
      {
        value: target.value + targetChanges.targetValue,
      }
    );

    return targetChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const targetSlice = createSlice({
  name: 'target',
  initialState,
  reducers: {
    handleAddTarget: (state) => {
      state.data.push({
        index: makeid(),
        title: 'New title',
        value: 0,
        target: 0,
      });
    },
    handleDeleteTarget: (state, action: PayloadAction<{ index: string }>) => {
      state.data = state.data.filter((item) => item.index !== action.payload.index);
    },
    handleChangeTargetTitle: (state, action: PayloadAction<{ index: string; title: string }>) => {
      const targetToChange = state.data.find((target) => target.index === action.payload.index);
      targetToChange!.title = action.payload.title;
      return state;
    },
    handleChangeTarget: (state, action: PayloadAction<{ index: string; target: number }>) => {
      const targetToChange = state.data.find((count) => count.index === action.payload.index);
      targetToChange!.target = action.payload.target;
      return state;
    },
    handleChangeTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.data.find((count) => count.index === action.payload.index);
      targetToChange!.value = action.payload.value;
      return state;
    },
    handleTopUpTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.data.find((count) => count.index === action.payload.index);
      targetToChange!.value = targetToChange!.value + action.payload.value;
      targetToChange!.history.push({
        date: moment().format('YYYY-MM-DD'),
        value: action.payload.value,
      });
      return state;
    },
    handleDecreaseTargetValue: (state, action: PayloadAction<{ index: string; value: number }>) => {
      const targetToChange = state.data.find((target) => target.index === action.payload.index);
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
