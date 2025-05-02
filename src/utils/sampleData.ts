import { Node, Edge } from 'reactflow';
import { Workflow } from '../store/workflowsSlice';
import { MetricData, TimeSeriesData } from '../store/metricsSlice';
import { format, subDays, subHours } from 'date-fns';

// Generate sample workflow data
export const generateSampleWorkflows = (): Workflow[] => {
  return [
    {
      id: 'workflow-1',
      name: 'Customer Onboarding',
      description: 'Process for onboarding new customers with credit checks',
      createdAt: new Date(2023, 1, 15).toISOString(),
      updatedAt: new Date(2023, 8, 3).toISOString(),
      metrics: {
        successRate: 92.5,
        averageCompletionTime: 35.2,
        currentActiveRoutes: 18
      },
      nodes: generateOnboardingWorkflowNodes(),
      edges: generateOnboardingWorkflowEdges()
    },
    {
      id: 'workflow-2',
      name: 'Risk Assessment',
      description: 'Evaluate potential risks for new business ventures',
      createdAt: new Date(2023, 3, 22).toISOString(),
      updatedAt: new Date(2023, 7, 12).toISOString(),
      metrics: {
        successRate: 85.7,
        averageCompletionTime: 122.5,
        currentActiveRoutes: 7
      },
      nodes: [],
      edges: []
    },
    {
      id: 'workflow-3',
      name: 'Fraud Detection',
      description: 'Automated pipeline for detecting potentially fraudulent transactions',
      createdAt: new Date(2023, 6, 8).toISOString(),
      updatedAt: new Date(2023, 9, 1).toISOString(),
      metrics: {
        successRate: 97.2,
        averageCompletionTime: 15.8,
        currentActiveRoutes: 245
      },
      nodes: [],
      edges: []
    }
  ];
};

// Generate time series data for a metric
const generateTimeSeriesData = (
  startValue: number,
  volatility: number,
  trend: number,
  days: number
): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  let currentValue = startValue;
  
  for (let i = days; i >= 0; i--) {
    for (let j = 0; j < 4; j++) { // 4 data points per day (every 6 hours)
      // Random fluctuation with underlying trend
      const randomChange = (Math.random() - 0.5) * volatility;
      currentValue = Math.max(0, currentValue + randomChange + trend);
      
      data.push({
        timestamp: subHours(subDays(new Date(), i), j * 6).toISOString(),
        value: parseFloat(currentValue.toFixed(2))
      });
    }
  }
  
  return data;
};

// Generate sample metrics data
export const generateSampleMetrics = (): MetricData[] => {
  return [
    {
      id: 'metric-1',
      name: 'Decision Success Rate',
      value: 87.5,
      previousValue: 85.2,
      change: 2.7,
      trend: 'up',
      timeSeriesData: generateTimeSeriesData(85, 4, 0.2, 7)
    },
    {
      id: 'metric-2',
      name: 'Average Processing Time',
      value: 42.3,
      previousValue: 45.7,
      change: -7.4,
      trend: 'down',
      timeSeriesData: generateTimeSeriesData(46, 3, -0.3, 7)
    },
    {
      id: 'metric-3',
      name: 'Daily Active Workflows',
      value: 124,
      previousValue: 124,
      change: 0,
      trend: 'stable',
      timeSeriesData: generateTimeSeriesData(120, 10, 0, 7)
    },
    {
      id: 'metric-4',
      name: 'Optimization Score',
      value: 72.8,
      previousValue: 68.3,
      change: 6.6,
      trend: 'up',
      timeSeriesData: generateTimeSeriesData(68, 2, 0.4, 7)
    }
  ];
};

// Generate sample workflow nodes
const generateOnboardingWorkflowNodes = (): Node[] => {
  return [
    {
      id: 'input-1',
      type: 'input',
      position: { x: 250, y: 80 },
      data: { label: 'New Customer' }
    },
    {
      id: 'decision-1',
      type: 'decision',
      position: { x: 250, y: 200 },
      data: { 
        label: 'Credit Check',
        conditions: [{ field: 'creditScore', operator: '>=', value: '700' }] 
      }
    },
    {
      id: 'action-1',
      type: 'action',
      position: { x: 100, y: 320 },
      data: { 
        label: 'Standard Onboarding',
        inputParams: [{ name: 'customerId', type: 'string' }],
        outputMapping: [{ from: 'result', to: 'onboardingResult' }]
      }
    },
    {
      id: 'action-2',
      type: 'action',
      position: { x: 380, y: 320 },
      data: { 
        label: 'Enhanced Verification',
        inputParams: [
          { name: 'customerId', type: 'string' },
          { name: 'creditScore', type: 'number' }
        ],
        outputMapping: [{ from: 'result', to: 'verificationResult' }]
      }
    },
    {
      id: 'decision-2',
      type: 'decision',
      position: { x: 380, y: 450 },
      data: { 
        label: 'Verification Passed',
        conditions: [{ field: 'verificationResult', operator: '==', value: 'passed' }] 
      }
    },
    {
      id: 'output-1',
      type: 'output',
      position: { x: 250, y: 580 },
      data: { label: 'Customer Onboarded' }
    },
    {
      id: 'output-2',
      type: 'output',
      position: { x: 550, y: 450 },
      data: { label: 'Onboarding Rejected' }
    }
  ];
};

// Generate sample workflow edges
const generateOnboardingWorkflowEdges = (): Edge[] => {
  return [
    { id: 'e1-2', source: 'input-1', target: 'decision-1' },
    { id: 'e2-3', source: 'decision-1', target: 'action-1', sourceHandle: 'true' },
    { id: 'e2-4', source: 'decision-1', target: 'action-2', sourceHandle: 'false' },
    { id: 'e3-6', source: 'action-1', target: 'output-1' },
    { id: 'e4-5', source: 'action-2', target: 'decision-2' },
    { id: 'e5-6', source: 'decision-2', target: 'output-1', sourceHandle: 'true' },
    { id: 'e5-7', source: 'decision-2', target: 'output-2', sourceHandle: 'false' }
  ];
};