import React from 'react'

export const DashboardContext = React.createContext({
  dashboard: null,
  color: null,
  fetchList: () => {}
})