// app/store/trainingSessionsSlice.ts
import type { ApiSession } from '@/app/api/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrainingSessionsState {
  sessions: ApiSession[];
}

const initialState: TrainingSessionsState = {
  sessions: [],
};

const trainingSessionsSlice = createSlice({
  name: 'trainingSessions',
  initialState,
  reducers: {
    // повна заміна списку (після GET /sessions)
    setSessions(state, action: PayloadAction<ApiSession[]>) {
      state.sessions = action.payload;
    },

    // додаємо нову сесію (після POST /sessions)
    addSession(state, action: PayloadAction<ApiSession>) {
      // нові зверху
      state.sessions.unshift(action.payload);
    },

    // оновлення сесії (після PUT /sessions/:id)
    updateSession(state, action: PayloadAction<ApiSession>) {
      const idx = state.sessions.findIndex(
        (s) => s.id === action.payload.id
      );
      if (idx !== -1) {
        state.sessions[idx] = action.payload;
      }
    },

    // видалення сесії по id
    deleteSession(state, action: PayloadAction<number>) {
      state.sessions = state.sessions.filter(
        (s) => s.id !== action.payload
      );
    },
  },
});

export const {
  setSessions,
  addSession,
  updateSession,
  deleteSession,
} = trainingSessionsSlice.actions;

export default trainingSessionsSlice.reducer;
