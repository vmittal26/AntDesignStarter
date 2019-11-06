import * as React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";

const Page = React.lazy(()=>import('./Page/Page'));

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header></header>
        <main>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={()=><h1>Home</h1>} />
              <Route exact path="/page" component={Page} />
              />
            </Switch>
          </React.Suspense>
        </main>
      </div>
    );
  }
}
