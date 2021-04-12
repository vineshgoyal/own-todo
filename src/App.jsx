import React, { useState } from 'react';
import Profile from './pages/Profile';
import { About, Contact } from './pages/About';
import Home from './pages/Home';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { ToasterContext } from './services/toasterContext';
import './style.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Toast } from 'react-bootstrap';


function App() {
    const [displayToaster, setToaster] = useState(false);
    const [toasterMessage, setToasterMessage] = useState("");
    const showToaster = (msg) => {
        setToaster(true);
        setToasterMessage(msg);
    }
    return <div className="App">
        <ToasterContext.Provider value={{ showToaster }}>
        <BrowserRouter>

                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Demo</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="/profile">Profile</Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Container >

                    <Toast show={displayToaster} className="main-toaster" delay={30000} autohide onClose={() => setToaster(false)} animation={true}>
                        <Toast.Header>
                            <img
                                src="https://via.placeholder.com/20"
                                className="rounded mr-2"
                                alt=""
                            />
                            <strong className="mr-auto">Notification &nbsp;&nbsp;&nbsp;</strong>
                            <small>{new Date().toDateString()}</small>
                        </Toast.Header>
                        <Toast.Body>{toasterMessage}</Toast.Body>
                    </Toast>
                </Container>
                <Route exact path="/" >

                    <Home />
                </Route>
            <Route path="/profile" component={Profile} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
        </BrowserRouter>
        </ToasterContext.Provider>
    </div>

}

export default App;