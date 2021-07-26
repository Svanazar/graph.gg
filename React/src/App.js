import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Team from './components/team/App.js'
import Home from './components/home/App';
import Visu from './components/visu/App';
import Cricket from './components/cricket/App';
import Cricket1 from './components/cricket1/App';
import Cricket2 from './components/cricket2/App';
import Bolly from './components/bolly/App';
import Poli from './components/poli/App';
import Contact from './components/contact/App';
import About from './components/about/about';

class App extends Component {
	render() {
		return (
			<div class="App">


				<Navbar fixed="top" bg="dark" variant="dark">
					<Navbar.Brand href="/">Home</Navbar.Brand>
					<Nav className="mr-auto">
						<Nav.Link href="/visu">Visualise</Nav.Link>
						{/* <Nav.Link href="/poli">Politics</Nav.Link> */}
						<Nav.Link href="/bolly">Bollywood</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="/team">Team</Nav.Link>
						<Nav.Link eventKey={2} href="/contact">
							Contact Us
						</Nav.Link>
					</Nav>

				</Navbar>
				<AnimatePresence >
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/visu" component={Visu} exact />
						<Route path="/team" component={Team} />
						<Route path="/about" component={About} />
						<Route path="/cricket" component={Cricket} />
						<Route path="/cricket1" component={Cricket1} />
						<Route path="/cricket2" component={Cricket2} />
						<Route path="/poli" component={Poli} />
						<Route path="/bolly" component={Bolly} />
						<Route path="/contact" component={Contact} />
					</Switch>
				</AnimatePresence>
			</div>
		);
	}
}

export default App;
