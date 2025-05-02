import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface InputNodeData {
  label: string;
}

const InputNodeComponent: React.FC<NodeProps<InputNodeData>> = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-blue-50 border-2 ${
      selected ? 'border-blue-500' : 'border-blue-300'
    }`}>
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium text-blue-700">{data.label}</div>
          <div className="text-xs text-blue-600">Starting point</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

export const InputNode = memo(InputNodeComponent);