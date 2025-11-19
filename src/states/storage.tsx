import { createMMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

const storage = createMMKV();

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: key => {
    storage.remove(key);
    return Promise.resolve();
  },
};

export default reduxStorage;
