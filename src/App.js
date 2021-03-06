import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import RegisterForm from "./RegisterForm";
import Home from "./Home";
import Nav from "./Nav";
import About from "./About";
import Shop from "./Shop";
import Footer from "./Footer";
import Sidenav from "./Sidenav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import UserReducer from "./reducer";

function App() {
  const store = createStore(UserReducer);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/RegisterForm" component={RegisterForm} />

          <div className="main">
            <Nav />
            <Sidenav />

            <Route path="/Home" exact component={Home} />
            <Route path="/About" component={About} />
            <Route path="/shop" component={Shop} />

            <Footer />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
