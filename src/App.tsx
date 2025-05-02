import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { WorkflowEditor } from './components/WorkflowEditor';
import { DashboardView } from './components/DashboardView';
import { useSelector } from 'react-redux';
import { RootState } from './store';

type View = 'workflow' | 'dashboard';

function App() {
  const [currentView, setCurrentView] = useState<View>('workflow');
  const { workflows } = useSelector((state: RootState) => state.workflows);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={currentView === 'workflow' ? 'Workflow Editor' : 'Dashboard'} />
        <main className="flex-1 overflow-auto p-6">
          {currentView === 'workflow' ? (
            <WorkflowEditor />
          ) : (
            <DashboardView workflows={workflows} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;