import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentRevenue: 900000,
  revenueData: [
    { month: "Jan", value: 800000 },
    { month: "Feb", value: 850000 },
    { month: "Mar", value: 900000 },
    { month: "Apr", value: 950000 },
    { month: "May", value: 1000000 },
    { month: "Jun", value: 1100000 },
  ],
  outcomeData: [
    { option: "Option A", successRate: 60 },
    { option: "Option B", successRate: 40 },
    { option: "Option C", successRate: 25 },
  ],
  isSimulating: false,
  simulationInterval: null,
}

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateRevenue: (state, action) => {
      state.currentRevenue = action.payload

      // Update the last month's revenue data
      if (state.revenueData.length > 0) {
        const lastIndex = state.revenueData.length - 1
        state.revenueData[lastIndex].value = action.payload
      }

      // Update outcome data based on revenue
      if (action.payload > 1000000) {
        state.outcomeData[0].successRate = 75
        state.outcomeData[1].successRate = 60
        state.outcomeData[2].successRate = 40
      } else {
        state.outcomeData[0].successRate = 60
        state.outcomeData[1].successRate = 40
        state.outcomeData[2].successRate = 25
      }
    },
    addRevenueDataPoint: (state, action) => {
      state.revenueData.push(action.payload)

      // Keep only the last 12 months
      if (state.revenueData.length > 12) {
        state.revenueData.shift()
      }
    },
    updateOutcomeData: (state, action) => {
      state.outcomeData = action.payload
    },
    setSimulationStatus: (state, action) => {
      state.isSimulating = action.payload
    },
    setSimulationInterval: (state, action) => {
      state.simulationInterval = action.payload
    },
  },
})

export const { updateRevenue, addRevenueDataPoint, updateOutcomeData, setSimulationStatus, setSimulationInterval } =
  dataSlice.actions

// Thunks
export const simulateDataChanges = (config) => (dispatch, getState) => {
  dispatch(setSimulationStatus(true))

  const intervalId = window.setInterval(() => {
    const { currentRevenue, revenueData } = getState().data

    // Generate a random change within the variance percentage
    const changePercentage = Math.random() * config.variance * 2 - config.variance
    const change = currentRevenue * (changePercentage / 100)
    const newRevenue = Math.max(100000, Math.round(currentRevenue + change))

    dispatch(updateRevenue(newRevenue))

    // Add a new data point every 3 updates
    if (Math.random() > 0.7) {
      const lastMonth = revenueData[revenueData.length - 1].month
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      const lastMonthIndex = months.indexOf(lastMonth)
      const nextMonthIndex = (lastMonthIndex + 1) % 12

      dispatch(
        addRevenueDataPoint({
          month: months[nextMonthIndex],
          value: newRevenue,
        }),
      )
    }
  }, config.interval)

  dispatch(setSimulationInterval(intervalId))
}

export const stopSimulation = () => (dispatch, getState) => {
  const { simulationInterval } = getState().data

  if (simulationInterval !== null) {
    clearInterval(simulationInterval)
    dispatch(setSimulationInterval(null))
    dispatch(setSimulationStatus(false))
  }
}

export default dataSlice.reducer
