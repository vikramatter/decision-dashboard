import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from 'reactflow';

interface NodesState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
}

const initialState: NodesState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<Node>) => {
      const index = state.nodes.findIndex(n => n.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    removeNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
      state.edges = state.edges.filter(
        edge => edge.source !== action.payload && edge.target !== action.payload
      );
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
    },
    removeEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter(edge => edge.id !== action.payload);
    },
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
  },
});

export const {
  setNodes,
  setEdges,
  addNode,
  updateNode,
  removeNode,
  addEdge,
  removeEdge,
  setSelectedNode,
} = nodesSlice.actions;

export default nodesSlice.reducer;