import React from 'react';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  GitBranchPlus, 
  Sliders, 
  Settings, 
  BarChart3, 
  HelpCircle 
} from 'lucide-react';
import { RootState } from '../store';

interface SidebarProps {
  currentView: 'workflow' | 'dashboard';
  onViewChange: (view: 'workflow' | 'dashboard') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h1 className="text-xl font-semibold text-blue-600">Decision Intelligence</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <button
          onClick={() => onViewChange('workflow')}
          className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
            currentView === 'workflow'
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <GitBranchPlus size={18} className="mr-3" />
          Workflow Editor
        </button>
        
        <button
          onClick={() => onViewChange('dashboard')}
          className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
            currentView === 'dashboard'
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard size={18} className="mr-3" />
          Dashboard
        </button>
        
        
      </nav>
      
     
      
    </div>
  );
};