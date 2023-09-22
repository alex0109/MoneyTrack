import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const reduxStorageMMKV = {
  setItem: (key: string, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
