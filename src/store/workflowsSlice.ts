import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from 'reactflow';
import { generateSampleWorkflows } from '../utils/sampleData';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
  metrics: {
    successRate: number;
    averageCompletionTime: number;
    currentActiveRoutes: number;
  };
}

interface WorkflowsState {
  workflows: Workflow[];
  currentWorkflowId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WorkflowsState = {
  workflows: generateSampleWorkflows(),
  currentWorkflowId: null,
  isLoading: false,
  error: null,
};

const workflowsSlice = createSlice({
  name: 'workflows',
  initialState,
  reducers: {
    setCurrentWorkflow: (state, action: PayloadAction<string>) => {
      state.currentWorkflowId = action.payload;
    },
    addWorkflow: (state, action: PayloadAction<Workflow>) => {
      state.workflows.push(action.payload);
    },
    updateWorkflow: (state, action: PayloadAction<Workflow>) => {
      const index = state.workflows.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.workflows[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    deleteWorkflow: (state, action: PayloadAction<string>) => {
      state.workflows = state.workflows.filter(w => w.id !== action.payload);
      if (state.currentWorkflowId === action.payload) {
        state.currentWorkflowId = state.workflows.length > 0 ? state.workflows[0].id : null;
      }
    },
    updateWorkflowElements: (
      state, 
      action: PayloadAction<{ id: string; nodes: Node[]; edges: Edge[] }>
    ) => {
      const { id, nodes, edges } = action.payload;
      const workflow = state.workflows.find(w => w.id === id);
      if (workflow) {
        workflow.nodes = nodes;
        workflow.edges = edges;
        workflow.updatedAt = new Date().toISOString();
      }
    }
  },
});

export const { 
  setCurrentWorkflow, 
  addWorkflow, 
  updateWorkflow, 
  deleteWorkflow,
  updateWorkflowElements
} = workflowsSlice.actions;

export default workflowsSlice.reducer;