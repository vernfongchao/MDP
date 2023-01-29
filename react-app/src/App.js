import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PortalPage from "./components/PortalPage/PortalPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <PortalPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
