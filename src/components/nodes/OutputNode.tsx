import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface OutputNodeData {
  label: string;
}

const OutputNodeComponent: React.FC<NodeProps<OutputNodeData>> = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-purple-50 border-2 ${
      selected ? 'border-purple-500' : 'border-purple-300'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500"
      />
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-purple-200 text-purple-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium text-purple-700">{data.label}</div>
          <div className="text-xs text-purple-600">Result</div>
        </div>
      </div>
    </div>
  );
};

export const OutputNode = memo(OutputNodeComponent);