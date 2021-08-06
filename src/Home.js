import React, { useContext, createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


 
let usersArr = [
    {id:1 , name:"zain", status:"private"},
    {id:2 , name:"husain", status:"public"},
]
export default function Home() {
    const history = useHistory();
    if(!localStorage.getItem('token')){
        history.push('/')
    }
    useEffect(()=>{
        if(localStorage.getItem('logged')){
            fakeAuth.isAuthenticated = true
        }else{
            fakeAuth.isAuthenticated = false
        }
    },[])
    return (
      <ProvideAuth>
        <Router>
          <div>
            <AuthButton />
  
            <ul>
              <li>
                <Link to="/public">Public Page</Link>
              </li>
              <li>
                <Link to="/protected">Protected Page</Link>
              </li>
            </ul>
  
            <Switch>
              <Route path="/public">
                <PublicPage />
              </Route>
              <Route path="/login1">
                <LoginPage />
              </Route>
              <PrivateRoute path="/protected">
                <ProtectedPage />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
    );
  }
  
const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      localStorage.setItem('logged',true)
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      localStorage.removeItem('logged')
      setTimeout(cb, 100);
    }
  };
  //context API
const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}
function useAuth() {
    return useContext(authContext);
  }
  
  function useProvideAuth() {
    const [user, setUser] = useState(null);
  
    const signin = cb => {
      return fakeAuth.signin(() => {
        setUser("user");
        cb();
      });
    };
  
    const signout = cb => {
      return fakeAuth.signout(() => {
          localStorage.clear();
        setUser(null);
        cb();
      });
    };
  
    return {
      user,
      signin,
      signout
    };
  }
  
  function AuthButton() {
    let history = useHistory();
    let auth = useAuth();
  
    return auth.user ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            auth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>Home page</p>
    );
  }
  
  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    let a = localStorage.getItem('logged') ? fakeAuth.isAuthenticated= true : fakeAuth.isAuthenticated =false;
    
        return (
            <Route
              {...rest}
              
              render={({ location }) =>
                a ? (
                  children
                ) : (
                    <>
                    <Redirect
                        to={{
                        pathname: "/login1",
                        state: { from: location }
                        }}
                    />
                  </>
                )
             }
      />
    );
  }
  
  function PublicPage() {
    return <h3>Public</h3>;
  }
  
  function ProtectedPage() {
    return <h3>Protected</h3>;
  }
  
  function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    // console.log(location, { from: { pathname: "/" } })
    let { from } = location.state || { from: { pathname: "/" } };

    console.log(from);
    let login = () => {
      auth.signin(() => {
        history.replace(from);
      });
    };
  
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={login}>Log in</button>
      </div>
    );
  }
  
