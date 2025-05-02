import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface DecisionNodeData {
  label: string;
  conditions: Array<{ field: string; operator: string; value: string }>;
}

const DecisionNodeComponent: React.FC<NodeProps<DecisionNodeData>> = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-amber-50 border-2 ${
      selected ? 'border-amber-500' : 'border-amber-300'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-amber-500"
      />
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-amber-200 text-amber-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m16 3-4 4-4-4"></path><path d="M4 7h16"></path><path d="M4 11h8"></path><path d="M4 15h8"></path><path d="m16 11-4 4-4-4"></path></svg>
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium text-amber-700">{data.label}</div>
          <div className="text-xs text-amber-600">
            {data.conditions && data.conditions.length > 0 
              ? `${data.conditions.length} condition${data.conditions.length !== 1 ? 's' : ''}` 
              : 'No conditions'}
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        className="w-3 h-3 bg-green-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        className="w-3 h-3 bg-red-500"
      />
    </div>
  );
};

export const DecisionNode = memo(DecisionNodeComponent);