import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface ActionNodeData {
  label: string;
  inputParams?: Array<{ name: string; type: string }>;
  outputMapping?: Array<{ from: string; to: string }>;
}

const ActionNodeComponent: React.FC<NodeProps<ActionNodeData>> = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-green-50 border-2 ${
      selected ? 'border-green-500' : 'border-green-300'
    }`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-green-500"
      />
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center bg-green-200 text-green-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 20v-6M6 20V10M18 20V4"></path></svg>
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium text-green-700">{data.label}</div>
          <div className="text-xs text-green-600">
            {data.inputParams && data.inputParams.length > 0 
              ? `${data.inputParams.length} parameter${data.inputParams.length !== 1 ? 's' : ''}` 
              : 'No parameters'}
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500"
      />
    </div>
  );
};

export const ActionNode = memo(ActionNodeComponent);