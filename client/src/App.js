import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from "./components/Home"
import RecipeDetail from './components/RecipeDetail';
import RecipeCreate from './components/RecipeCreate';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path={"/"} component={LandingPage}/>
      <Route exact path={"/home"} component={Home}/>
      <Route exact path={"/recipes/:id"} component={RecipeDetail}/>
      <Route exact path={"/form"} component={RecipeCreate}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
