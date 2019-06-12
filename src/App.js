import React from 'react';
import { Dashboard } from './containers/Dashboard';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { DashboardList } from './components/dashboard/DashboardList';
import styled from 'styled-components'

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" component={DashboardList} />
        <Route path="/:dashboard" component={Dashboard} />
      </Layout>
    </Router>
  );
}

const Layout = styled.div`
  height: 100vh;
  max-width: 100vw;
`

export default App;