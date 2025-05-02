import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateSampleMetrics } from '../utils/sampleData';

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export interface MetricData {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  timeSeriesData: TimeSeriesData[];
}

interface MetricsState {
  metrics: MetricData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MetricsState = {
  metrics: generateSampleMetrics(),
  isLoading: false,
  error: null,
};

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<MetricData[]>) => {
      state.metrics = action.payload;
    },
    updateMetric: (state, action: PayloadAction<MetricData>) => {
      const index = state.metrics.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.metrics[index] = action.payload;
      }
    },
    addTimeSeriesDataPoint: (
      state, 
      action: PayloadAction<{ id: string; dataPoint: TimeSeriesData }>
    ) => {
      const { id, dataPoint } = action.payload;
      const metric = state.metrics.find(m => m.id === id);
      if (metric) {
        metric.timeSeriesData.push(dataPoint);
        

        metric.previousValue = metric.value;
        metric.value = dataPoint.value;
        
        const change = ((metric.value - metric.previousValue) / metric.previousValue) * 100;
        metric.change = Math.round(change * 100) / 100;
        
        if (metric.change > 0) {
          metric.trend = 'up';
        } else if (metric.change < 0) {
          metric.trend = 'down';
        } else {
          metric.trend = 'stable';
        }
      }
    }
  },
});

export const { setMetrics, updateMetric, addTimeSeriesDataPoint } = metricsSlice.actions;

export default metricsSlice.reducer;