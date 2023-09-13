import {Route,BrowserRouter as Router,Redirect,Switch} from "react-router-dom";
import LoadingSpinner from "./shared/Components/UIElements/LoadingSpinner";
import MainNavigation from "./shared/Components/Navigation/MainNavigation";
import { AuthContext } from "./shared/Components/Context/auth-context";
import { useAuth } from "./shared/Components/hooks/auth-hook";
import Auth from "./users/pages/Auth";
import React, {Suspense} from "react";


const App = () => {
  const {token, login, logout, userId, name} = useAuth();
  let routes;

  if(token){
    routes = (<Switch>
                <Route path="/auth" > <Auth /> </Route>
                <Redirect to="/"/>
              </Switch>);
  } else{
    routes = ( <Switch>
                <Route path="/auth" > <Auth /> </Route>
                <Redirect to="/auth"/>
              </Switch>
              );
  }

return (
  <AuthContext.Provider value={{isLoggedIn: !!token, token: token, name: name ,userId: userId,login: login, logout:  logout}}>
    <Router>
      <MainNavigation />
      <main>
        <Suspense fallback={
          <div className="center">
            <LoadingSpinner />
          </div>
        }>{routes}</Suspense>
      </main>
    </Router>
  </AuthContext.Provider>
);
}

export default App;
