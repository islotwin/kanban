import React from 'react'

export const DashboardContext = React.createContext({
  dashboard: null,
  fetchList: () => {}
})