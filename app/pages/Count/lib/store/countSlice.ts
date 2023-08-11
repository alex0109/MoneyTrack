import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

import { db_key } from '../../../../shared/lib/constants/DB_KEY';
import { root_url } from '../../../../shared/lib/constants/REF_URL';

import type { CountState, ICount } from '../types/interfaces';

const initialState: CountState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCounts = createAsyncThunk<ICount[], string, { rejectValue: string }>(
  'counts/fetchCounts',
  async function (uid, { rejectWithValue }) {
    try {
      const response = await axios.get(`${root_url}/users/${uid}/counts.json?auth=${db_key}`);

      const data = Object.entries(response.data).map(([key, value]) => ({
        ...value,
        index: key,
      }));

      return data;
    } catch (error) {
      if (error.toJSON().message === 'Network Error') {
        return rejectWithValue('Network error');
      }
      return rejectWithValue('Server error');
    }
  }
);

export const addNewCount = createAsyncThunk<ICount, string, { rejectValue: string }>(
  'counts/addNewCount',
  async function (uid, { rejectWithValue }) {
    try {
      const newCount = {
        title: 'New title',
        value: 0,
        history: [
          {
            date: moment().format('YYYY-MM-DD'),
            value: 0,
          },
        ],
      };
      const response = await axios.post(
        `${root_url}/users/${uid}/counts.json?auth=${db_key}`,
        newCount
      );

      newCount.index = response.data.name;

      return newCount;
    } catch (error) {
      return rejectWithValue('Server error');
    }
  }
);

export const deleteCount = createAsyncThunk<
  string,
  { uid: string; countID: string },
  { rejectValue: string }
>('counts/deleteCount', async function (countChanges, { rejectWithValue }) {
  try {
    await axios.delete(
      `${root_url}/users/${countChanges.uid}/counts/${countChanges.countID}.json?auth=${db_key}`
    );

    return countChanges.countID;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeCountTitle = createAsyncThunk<
  { countID: string; countTitle: string },
  { uid: string; countID: string; countTitle: string },
  { rejectValue: string }
>('counts/changeCountTitle', async function (countChanges, { rejectWithValue }) {
  try {
    await axios.patch(
      `${root_url}/users/${countChanges.uid}/counts/${countChanges.countID}.json?auth=${db_key}`,
      { title: countChanges.countTitle }
    );

    return countChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const changeCountValue = createAsyncThunk<
  { countID: string; countValue: number; historyValue: number },
  { uid: string; countID: string; countValue: number; historyValue: number },
  { rejectValue: string; state: CountState }
>('counts/changeCountValue', async function (countChanges, { rejectWithValue, getState }) {
  const count: ICount = getState().count.data.find((count) => count.index === countChanges.countID);

  const newHistoryItem = {
    date: moment().format('YYYY-MM-DD'),
    value: countChanges.historyValue,
  };

  try {
    await axios.patch(
      `${root_url}/users/${countChanges.uid}/counts/${countChanges.countID}.json?auth=${db_key}`,
      {
        value: countChanges.countValue,
        history: [...count.history, newHistoryItem],
      }
    );

    return countChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const decreaseCountValue = createAsyncThunk<
  { countID: string; countValue: number },
  { uid: string; countID: string; countValue: number },
  { rejectValue: string; state: CountState }
>('counts/decreaseCountValue', async function (countChanges, { rejectWithValue, getState }) {
  const count = getState().count.data.find((count) => count.index === countChanges.countID);

  try {
    await axios.patch(
      `${root_url}/users/${countChanges.uid}/counts/${countChanges.countID}.json?auth=${db_key}`,
      {
        value: count.value - countChanges.countValue,
      }
    );

    return countChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const topUpCountValue = createAsyncThunk<
  { countID: string; countValue: number },
  { uid: string; countID: string; countValue: number },
  { rejectValue: string; state: CountState }
>('counts/topUpCountValue', async function (countChanges, { rejectWithValue, getState }) {
  const count = getState().count.data.find((count) => count.index === countChanges.countID);

  const newHistoryItem = {
    date: moment().format('YYYY-MM-DD'),
    value: countChanges.countValue,
  };

  try {
    await axios.patch(
      `${root_url}/users/${countChanges.uid}/counts/${countChanges.countID}.json?auth=${db_key}`,
      {
        value: count.value + countChanges.countValue,
        history: [...count.history, newHistoryItem],
      }
    );

    return countChanges;
  } catch (error) {
    return rejectWithValue('Server error');
  }
});

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCounts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCounts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addNewCount.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteCount.fulfilled, (state, action) => {
        state.data = state.data.filter((count) => count.index !== action.payload);
      })
      .addCase(changeCountTitle.fulfilled, (state, action) => {
        const countToChange = state.data.find((count) => action.payload.countID === count.index);
        if (countToChange) {
          countToChange.title = action.payload.countTitle;
        }
      })
      .addCase(changeCountValue.fulfilled, (state, action) => {
        const countToChange = state.data.find((count) => action.payload.countID === count.index);
        if (countToChange) {
          countToChange.value = action.payload.countValue;
          countToChange.history = [
            ...countToChange.history,
            {
              date: moment().format('YYYY-MM-DD'),
              value: action.payload.historyValue,
            },
          ];
        }
      })
      .addCase(decreaseCountValue.fulfilled, (state, action) => {
        const countToChange = state.data.find((count) => action.payload.countID === count.index);
        if (countToChange) {
          countToChange.value = countToChange.value - action.payload.countValue;
        }
      })
      .addCase(topUpCountValue.fulfilled, (state, action) => {
        const countToChange = state.data.find((count) => action.payload.countID === count.index);
        if (countToChange) {
          countToChange.value = countToChange.value + action.payload.countValue;
          countToChange.history = [
            ...countToChange.history,
            {
              date: moment().format('YYYY-MM-DD'),
              value: action.payload.countValue,
            },
          ];
        }
      });
  },
});

export const countReducers = countSlice.reducer;
export const countActions = countSlice.actions;
