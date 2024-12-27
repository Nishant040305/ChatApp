import { configureStore, combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import userReducer from './Store/userSlice';
import ChatSlice from './Store/Chat';
import NotificationSlice from './Store/Notifications';
// Root reducer with undo functionality for specific slices
const rootReducer = combineReducers({
  user: userReducer,
  chat:ChatSlice,
  notifications: NotificationSlice,
});
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
// Clear storage for development
persistor.purge(); // This will clear the persisted state
  