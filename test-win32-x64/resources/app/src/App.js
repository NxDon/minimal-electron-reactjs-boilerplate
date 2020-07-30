import React from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import "antd/dist/antd.css"
import './App.css';
import PageFrame from './page/Frame';
import Simulation429 from './page/subPages/Simulation429';
import Monitor429 from './page/subPages/Monitor429';
import Simulation422 from "./page/subPages/Simulation422";
import SimulationDiscrete from "./page/subPages/SimulationDiscrete";
import SimulationDifDiscrete from "./page/subPages/SimulationDifDiscrete";
import Monitor422 from "./page/subPages/Monitor422";
import MonitorDiscrete from "./page/subPages/MonitorDiscrete";
import MonitorDifDiscrete from "./page/subPages/MonitorDifDiscrete";
function App() {
  return (
    <Router>
      <PageFrame className="App">
        <Switch>
          <Route
            key="1"
            exact path="/simulation/429"
            component={Simulation429}
          />
          <Route
            key="2"
            exact path="/simulation/422"
            component={Simulation422}
          />
          <Route
            key="3"
            exact path="/simulation/discrete"
            component={SimulationDiscrete}
          />
          <Route
            key="4"
            exact path="/simulation/dif_discrete"
            component={SimulationDifDiscrete}
          />
          <Route
            key="5"
            path="/monitor/429"
            component={Monitor429}
          />
          <Route
            key="6"
            path="/monitor/422"
            component={Monitor422}
          />
          <Route
            key="7"
            path="/monitor/discrete"
            component={MonitorDiscrete}
          />
          <Route
            key="8"
            path="/monitor/dif_discrete"
            component={MonitorDifDiscrete}
          />
        </Switch>
      </PageFrame>
    </Router>
  );
}

export default App;
