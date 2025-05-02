# Decision Intelligence Dashboard

An interactive dashboard that visualizes decision-making workflows using ReactFlow, dynamic charts, and simulated real-time data.

## Overview

This project implements a frontend engineering challenge to build a Decision Intelligence Dashboard with the following key features:

- Interactive workflow builder with drag-and-drop functionality
- Conditional logic implementation for decision paths
- Real-time data visualization with dynamic updates
- Redux-based state management

## Technologies Used

- **React.js**: Frontend UI library
- **Redux Toolkit**: State management
- **ReactFlow**: Workflow visualization and interaction
- **Chart.js**: Data visualization with charts
- **Vite**: Build tool

## Project Structure

```
decision-intelligence-dashboard/
├── public/            # Static assets
├── src/
│     
│   ├── components/
│   │   ├── Metrics/    # Chart components
│   │   ├── Nodes/    # Nodes components  
│   │   ├── Dashboard/ # Main dashboard component
│   │   └── Workflow/ # Workflow components
│   ├── store/         # Redux store and slices
│   └── utils/         # Utility functions
├── App.tsx            # Main application component
└── main.tsx          # Entry point
```

## Features

### Workflow Builder

- Create and connect nodes representing decision points
- Define conditional logic for workflow paths
- Visually highlight active paths based on current metrics

### Real-time Data Visualization

- Time-series graph showing revenue data
- Bar chart comparing decision outcomes
- Simulated real-time updates that affect the workflow paths

### Conditional Logic

- When connecting nodes, define rules (e.g., "If revenue > $1M, proceed to Node X")
- Workflow paths are highlighted based on these conditions and current metrics

## Architecture Decisions

### State Management

The application uses Redux Toolkit for state management with two main slices:

1. **workflowSlice**: Manages nodes, edges, selections, and highlighted paths
2. **dataSlice**: Handles revenue data, outcome data, and current metrics

This separation allows for clean management of different aspects of the application state.

### Component Structure

Components are organized by feature and responsibility:

- **Dashboard**: Main container component
- **WorkflowBuilder**: Handles the workflow editing functionality
- **Charts**: Visualization components for different data types

### Real-time Updates

Real-time data updates are simulated using a custom hook `useDataUpdates` that:

1. Generates new data points on a set interval
2. Updates the Redux store with new metrics
3. Recalculates and highlights active workflow paths based on current metrics

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/decision-intelligence-dashboard.git
cd decision-intelligence-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Workflow Building**:
   - Drag nodes to position them
   - Connect nodes to create decision paths
   - Click on edges to set conditions

2. **Data Simulation**:
   - Use the "Start Data Updates" button to begin simulating real-time data
   - Watch as the workflow highlights active paths based on changing metrics

3. **Customization**:
   - Add new nodes with the "Add Node" button
   - Update node names by selecting a node and using the update form
   - Define edge conditions by clicking on edges

## Future Enhancements

- More metrics types beyond revenue
- Ability to save and load workflows
- More complex conditional expressions
- Custom node types for different decision scenarios
- User authentication and workflow sharing
