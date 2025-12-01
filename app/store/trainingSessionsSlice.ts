// app/store/trainingSessionsSlice.ts
import type { ApiSession } from '@/app/api/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrainingSessionsState {
  sessions: ApiSession[];
}

const initialState: TrainingSessionsState = {
  sessions: [],
};

const trainingSessionsSlice = createSlice({
  name: 'trainingSessions',
  initialState,
  reducers: {
    setSessions(state, action: PayloadAction<ApiSession[]>) {
      state.sessions = action.payload;
    },
  },
});

export const { setSessions } = trainingSessionsSlice.actions;
export default trainingSessionsSlice.reducer;
