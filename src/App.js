import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import './App.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function PrivateRoute({ children, isAuth, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

let setIsAuthWithToken = () => {
  return (localStorage.getItem("token")) ? true : false;
}


function App() {  

  const [ isAuth, setIsAuth] = useState(setIsAuthWithToken());

  let signOut = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuth(false);

  } 
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <ul className="d-flex list-unstyled my-2">
              <li hidden={isAuth} className="mx-2"><Link to="/login">Login</Link></li>
              <li hidden={isAuth} className="mx-2"><Link to="/registro">Registro</Link></li>
              <li hidden={!isAuth} className="mx-2"><Link to="/dashboard">Dashboard</Link></li>
              <li hidden={!isAuth} className="mx-2"><Link to="/" onClick={signOut} >Sair</Link></li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Switch>
          <Route path="/registro" children={<Register/>}/>
          {/* <Route exact path="/login"  render={(props) => <Login login={()=>{setIsAuth(true)}} />} /> */}
          <Route exact path="/login">

            { !isAuth && <Login login={()=>{setIsAuth(true)}} />}
            { isAuth && <Redirect to="/dashboard" />}
          </Route>
          <PrivateRoute path="/dashboard" isAuth={isAuth} children={<Dashboard/>}/>
          <Route exact path="/">

            { !isAuth && <Login login={()=>{setIsAuth(true)}} />}
            { isAuth && <Redirect to="/dashboard" />}
          </Route>
        </Switch>
      </Container>
  </Router>

  );
}

export default App;
