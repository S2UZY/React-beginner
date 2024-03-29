import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/React-beginner/:coinId">
          <Coin />
        </Route>
        <Route path="/React-beginner">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
