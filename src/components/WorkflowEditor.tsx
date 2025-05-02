import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection
} from 'reactflow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { Plus, Save, Play,Pause, Trash2 } from 'lucide-react';
import { updateWorkflowElements } from '../store/workflowsSlice';
import { NodeConfigPanel } from './NodeConfigPanel';
import { DecisionNode } from './nodes/DecisionNode';
import { ActionNode } from './nodes/ActionNode';
import { InputNode } from './nodes/InputNode';
import { OutputNode } from './nodes/OutputNode';
import 'reactflow/dist/style.css';
import { simulateDataChanges, stopSimulation } from '../store/dataSlice';

const nodeTypes = {
  decision: DecisionNode,
  action: ActionNode,
  input: InputNode,
  output: OutputNode,
};

export const WorkflowEditor: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { workflows, currentWorkflowId } = useSelector((state: RootState) => state.workflows);
const [isSimulating,setIsSimulating]=useState(false)
  const currentWorkflow = workflows.find(w => w.id === currentWorkflowId) || workflows[0];
  
  const [nodes, setNodes, onNodesChange] = useNodesState(currentWorkflow.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(currentWorkflow.edges);
  const [selectedNode, setSelectedNode] = useState(null)

  const onNodeClick = useCallback((_, node) => {
    console.log(node,nodes,"nodes");
    
    setSelectedNode(node.id)
  }, [])


  console.log(selectedNode,"selectedNode");
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const toggleSimulation = () => {
    if (isSimulating) {
      dispatch(stopSimulation());
      setIsSimulating(false);
    } else {
      dispatch(
        simulateDataChanges({
          interval: 200,
          variance: 20,
        }) as any
      );
      setIsSimulating(true);
    }
  }

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  
  const handleSave = () => {
    dispatch(updateWorkflowElements({
      id: currentWorkflow.id,
      nodes,
      edges
    }));
  };
  
  const addNewNode = (type: string) => {
    const newNode: Node = {
      id: `node_${Date.now()}`,
      type,
      position: { x: 250, y: 250 },
      data: { 
        label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        conditions: type === 'decision' ? [{ field: '', operator: '==', value: '' }] : [],
        inputParams: type === 'action' ? [{ name: '', type: 'string' }] : [],
        outputMapping: type === 'action' ? [{ from: '', to: '' }] : [],
      }
    };
    
    setNodes(nds => [...nds, newNode]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium">{currentWorkflow.name}</h2>
          <p className="text-sm text-slate-500">{currentWorkflow.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-blue-600 text-white rounded-md flex items-center text-sm shadow-sm hover:bg-blue-700"
          >
            <Save size={16} className="mr-2" />
            Save
          </button>
          <button onClick={toggleSimulation} className="px-3 py-2 bg-green-600 text-white rounded-md flex items-center text-sm shadow-sm hover:bg-green-700">
           
            {isSimulating ? (
          <>
            <Pause className="h-4 w-4" /> Stop Simulation
          </>
        ) : (
          <>
             <Play size={16} className="mr-2" />  Start Simulation
          </>
        )}
          
          </button>
        </div>
      </div>
      
      <div ref={reactFlowWrapper} className="flex-1 bg-slate-100 rounded-lg shadow-inner overflow-hidden">
        <ReactFlow
          nodes={nodes}
          onNodeClick={onNodeClick}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background size={1} gap={16} color="#f1f5f9" />
          <Controls />
          <MiniMap />
          
          <Panel position="top-right" className="bg-white rounded-md shadow-md p-2 mx-4 my-4">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => addNewNode('input')}
                className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                title="Add Input Node"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => addNewNode('decision')}
                className="p-2 bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100"
                title="Add Decision Node"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => addNewNode('action')}
                className="p-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100"
                title="Add Action Node"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => addNewNode('output')}
                className="p-2 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100"
                title="Add Output Node"
              >
                <Plus size={16} />
              </button>
              <div className="border-t border-slate-200 pt-2">
                <button
                  className="p-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                  title="Delete Selected"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>
      {selectedNode && <NodeConfigPanel nodes={nodes} selectedNodeId={selectedNode} onClose={() => setSelectedNode(null)} />}

    </div>
  );
};