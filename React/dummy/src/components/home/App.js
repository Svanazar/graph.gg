import React, { Component } from 'react';
import './App.css';
import { Graph } from "react-d3-graph";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar'
// graph payload (with minimalist structure)

class App extends Component {




	render() {



		return (
			<main>
				<Switch>
					<div className="App" >

						<div className="jumbotron">
							<h1 class="display-3">Graph.gg</h1>
							<p class="lead">A graph network based web-app to visualise relationships between Indian celebrities built using Wikipedia data.</p>
							<hr class="my-2" />
							<p>More info</p>
							<p class="lead">
								<a class="btn btn-primary btn-lg" href="/visu" role="button">Start Visualising</a>
							</p>
						</div>
					</div>
				</Switch>
			</main >
		);
	}
}

export default App;
