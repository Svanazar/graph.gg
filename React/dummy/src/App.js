import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Visu from './components/visu/App';
import Cricket from './components/cricket/App';
import Cricket1 from './components/cricket1/App';
import Cricket2 from './components/cricket2/App';
import Bolly from './components/bolly/App';
import Poli from './components/poli/App';
import About from './components/about/about';
class App extends Component {
	render() {
		return (
			<main>
				<Switch>
					<Route path="/" component={Visu} exact />
					<Route path="/about" component={About} />
					<Route path="/cricket" component={Cricket} />
					<Route path="/cricket1" component={Cricket1} />
					<Route path="/cricket2" component={Cricket2} />
					<Route path="/poli" component={Poli} />
					<Route path="/bolly" component={Bolly} />
				</Switch>
			</main>
		);
	}
}

export default App;
