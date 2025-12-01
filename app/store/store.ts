// app/store/store.ts
import trainingSessionsReducer from '@/app/store/trainingSessionsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    trainingSessions: trainingSessionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
