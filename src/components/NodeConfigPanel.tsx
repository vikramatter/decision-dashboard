import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateNode } from '../store/nodesSlice';

export const NodeConfigPanel: React.FC = ({nodes,selectedNodeId,onClose}) => {
  const dispatch = useDispatch()
  const selectedNode = nodes.find(node => node.id === selectedNodeId);
  const [nodeData, setNodeData] = useState(selectedNode?.data || {})
  const [edgeData, setEdgeData] = useState({})

  useEffect(() => {
    if (selectedNode) {
      setNodeData(selectedNode.data)
    }

   
    // const initialEdgeData = {}
    // connectedEdges.forEach((edge) => {
    //   initialEdgeData[edge.id] = edge.data || {}
    // })
    // setEdgeData(initialEdgeData)
  }, [selectedNode])

  // if (!node) return null

  const handleNodeDataChange = (key, value) => {
    console.log(key,value,"changing",nodeData,selectedNode.data);
    
    setNodeData((prev) => ({ ...prev, [key]: value }))
  }

  const handleEdgeDataChange = (edgeId, key, value) => {
    setEdgeData((prev) => ({
      ...prev,
      [edgeId]: { ...prev[edgeId], [key]: value },
    }))
  }

  const saveChanges = () => {
    // Update node
    console.log(selectedNodeId,nodeData,"nodedata");
    
    dispatch(updateNode({ id: selectedNodeId, data: nodeData }))

   

    onClose()
  }
  
  
  
console.log(selectedNode,selectedNodeId,nodes,"selectedNodes");

  
  return (
    <div className="absolute right-20 top-16 bottom-0 w-80 h-80 bg-white border-l border-slate-200 p-4 overflow-y-auto">
      <h3 className="text-lg font-medium mb-4">Node Properties</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Label
          </label>
          <input
           onChange={(e) => handleNodeDataChange("label", e.target.value)}
            type="text"
            value={nodeData.label||""}
            className="w-full px-3 py-2 border border-slate-300 rounded-md"
          />
        </div>
        
        {selectedNode?.type === 'decision' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Conditions
            </label>
            {selectedNode?.data.conditions.map((condition, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={condition.field}
                  placeholder="Field"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                />
                <select
                  value={condition.operator}
                  className="px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="==">=</option>
                  <option value="!=">&ne;</option>
                  <option value=">">&gt;</option>
                  <option value=">=">&ge;</option>
                  <option value="<">&lt;</option>
                  <option value="<=">&le;</option>
                </select>
                <input
                  type="text"
                  value={condition.value}
                  placeholder="Value"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                />
              </div>
            ))}
            <button className="text-sm text-blue-600 hover:text-blue-800">
              + Add Condition
            </button>
            <button className="text-sm bg-green ml-4 text-blue-600 hover:text-blue-800" onClick={saveChanges}>
                  Save
                </button>
          </div>
        )}
        
        {selectedNode?.type === 'action' && (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Input Parameters
              </label>
              {selectedNode?.data.inputParams?.map((param, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={param.name}
                    placeholder="Name"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                  <select
                    value={param.type}
                    className="px-3 py-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="object">Object</option>
                  </select>
                </div>
              ))}
              <button className="text-sm text-blue-600 hover:text-blue-800">
                + Add Parameter
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Output Mapping
              </label>
              {selectedNode?.data.outputMapping?.map((mapping, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={mapping.from}
                    placeholder="From"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                  <span className="text-slate-500">&rarr;</span>
                  <input
                    type="text"
                    value={mapping.to}
                    placeholder="To"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm"
                  />
                </div>
              ))}
              <button className="text-sm text-blue-600 hover:text-blue-800">
                + Add Mapping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};