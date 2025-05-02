import { configureStore } from '@reduxjs/toolkit';
import workflowsReducer from './workflowsSlice';
import nodesReducer from './nodesSlice';
import metricsReducer from './metricsSlice';

export const store = configureStore({
  reducer: {
    workflows: workflowsReducer,
    nodes: nodesReducer,
    metrics: metricsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;