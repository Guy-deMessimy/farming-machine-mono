import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import authReducer from './slices/auth/auth-slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // seul le slice auth est persisté
};

const rootReducer = combineReducers({
  auth: authReducer,
  // add reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Redux toolkit s'assure que les states, actions et valeurs sont serialisables cad convertibles en json sans erreur (donc pas de date, map, set, class, promise)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // à ajuster si tu stockes des objets non serializables
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
