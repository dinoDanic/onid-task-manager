import React from "react";
import { Route } from "react-router-dom";

import Space from "./pages/space/space.component";
import Home from "./pages/home/home.component";
import DockStation from "./pages/dock-station/dock-station.component";
import Station from "./pages/station/station.component";

import "./app.styles.scss";

function App() {
  return (
    <div className="app">
      <Route path="/" component={Space} />
      <Route path="/s/:id" component={Station} />
      <Route exact path="/s/:id" component={DockStation} />
      <Route exact path="/" component={Home} />
    </div>
  );
}

export default App;
