import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/pe-icon-7-stroke.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import AvailableIpList from "./components/AvailableIpList.component";
import ProxyHistory from "./components/ProxyHistory.component";
import UsedProxy from "./components/UsedProxy.component";
import UserList from "./components/UserList.component";
import UserProxy from "./components/UserProxy.component";
import BlackList from "./components/BlackList.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;
        console.log(currentUser);
        return (
            <Router>
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="/home">HOME</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto ml-auto">
                                <Nav.Link href="/availableIpList" className="px-3">Available IP</Nav.Link>
                                <Nav.Link href="/usedProxy" className="px-3">Used Proxy</Nav.Link>
                                <Nav.Link href="/proxyHistory" className="px-3">Proxy History</Nav.Link>
                                <Nav.Link href="/users" className="px-3">Users</Nav.Link>
                                <Nav.Link href="/blacklist" className="px-3">Blacklist</Nav.Link>
                                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown" className="px-3">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                            {currentUser ? (
                                <div>
                                    <Nav>
                                        <Nav.Link href="/profile">{currentUser.username}</Nav.Link>
                                        <Nav.Link href="/login" onClick={this.logOut}>LogOut</Nav.Link>
                                    </Nav>
                                </div>
                            ) : (
                                    <div>
                                        <Nav>
                                            <Nav.Link href="/login">Login</Nav.Link>
                                            <Nav.Link href="/register">Sign Up</Nav.Link>
                                        </Nav>
                                    </div>
                                )}
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="container mt-3">
                        <Switch>
                            {currentUser ? (
                                <Route exact path="/" component={Home} />
                            ) : (
                                    <Route exact path="/" component={Home} />
                                )}
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/availableIpList" component={AvailableIpList} />
                            <Route exact path="/proxyHistory" component={ProxyHistory} />
                            <Route exact path="/usedProxy" component={UsedProxy} />
                            <Route exact path="/users" component={UserList} />
                            <Route exact path="/blacklist" component={BlackList} />
                            <Route exact path="/userProxy/:id" component={UserProxy}></Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;