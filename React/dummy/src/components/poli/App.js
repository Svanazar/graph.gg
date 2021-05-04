import React, { Component } from 'react';
import './App.css';
import AutoCompleteText from './Autocomplete';
import { AnimatePresence, motion } from 'framer-motion';
import Showrecos from './Showrecos';
import { Graph } from "react-d3-graph";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// graph payload (with minimalist structure)
const pageVariants = {
	initial: {
		opacity: 0,
		x: "-100vw",
		scale: 0.8
	},
	in: {
		opacity: 1,
		x: 0,
		scale: 1
	},
	out: {
		opacity: 0,
		x: "100vw",
		scale: 1.2
	}
};
const pageTransition = {
	type: "tween",
	ease: "anticipate",
	duration: 0.5
};

class App extends Component {
	constructor(props) {
		super(props);
		this.showpath = null;

		this.state = {
			name1: '',
			name2: '',
			path: null
		};
		this.data = {
			nodes: [],
			links: [],
		};

		this.myConfig = {
			"automaticRearrangeAfterDropNode": true,
			"collapsible": true,
			"directed": false,
			"focusAnimationDuration": 0.75,
			"focusZoom": 1,
			"freezeAllDragEvents": false,
			"height": 400,
			"highlightDegree": 1,
			"highlightOpacity": 1,
			"linkHighlightBehavior": false,
			"maxZoom": 8,
			"minZoom": 0.1,
			"nodeHighlightBehavior": true,
			"panAndZoom": true,
			"staticGraph": false,
			"staticGraphWithDragAndDrop": false,
			"width": 800,
			"d3": {
				"alphaTarget": 0.05,
				"gravity": -100,
				"linkLength": 100,
				"linkStrength": 1,
				"disableLinkForce": false
			},
			"node": {
				"color": "#d3d3d3",
				"fontColor": "black",
				"fontSize": 14,
				"fontWeight": "normal",
				"highlightColor": "SAME",
				"highlightFontSize": 16,
				"highlightFontWeight": "bold",
				"highlightStrokeColor": "SAME",
				"highlightStrokeWidth": "SAME",
				"labelProperty": "id",
				"mouseCursor": "pointer",
				"opacity": 1,
				"renderLabel": true,
				"size": 350,
				"strokeColor": "none",
				"strokeWidth": 2.5,
				"svg": "",
				"symbolType": "circle"
			},
			"link": {
				"color": "#d3d3d3",
				"fontColor": "black",
				"fontSize": 8,
				"fontWeight": "normal",
				"highlightColor": "SAME",
				"highlightFontSize": 8,
				"highlightFontWeight": "normal",
				"labelProperty": "label",
				"mouseCursor": "pointer",
				"opacity": 1,
				"renderLabel": false,
				"semanticStrokeWidth": false,
				"strokeWidth": 1.5,
				"markerHeight": 6,
				"markerWidth": 6,
				"strokeDasharray": 0,
				"strokeDashoffset": 0,
				"strokeLinecap": "butt"
			}
		}


		this.pressedShortest = 0;
		this.pressedMutuals = 0;
	}

	handleSubmit = async () => {

		this.showpath = null;
		this.pressedShortest = 1;
		this.setState({
			path: null
		})
		console.log(JSON.stringify(this.state))
		let response = await fetch('/reactdata/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(this.state),
			credentials: 'include'
			// mode: 'cors'

		})
		if (response.ok) { // if HTTP-status is 200-299
			// get the response body (the method explained below)
			let json = await response.json();
			console.log(json["shortestpath"])
			this.setState({
				path: json["shortestpath"],
				pressedRecos: 0,
			})




		} else {
			alert("HTTP-Error: " + response.status);
		}
	}




	changeName1 = (newName) => {
		this.setState({
			name1: newName
		})
	}



	render() {



		if (this.pressedShortest) {

			this.data.nodes = [];
			this.data.links = [];
			for (const node in this.state.path) {
				this.data.nodes.push({ id: `${this.state.path[node]}` });
				if (node > 0) {
					this.data.links.push({ source: `${this.state.path[node]}`, target: `${this.state.path[node - 1]}` });
				}
			}
			// <Shortestpath thepath={this.state.path} />
			this.showpath =
				(
					<div >
						<div className="thegraph">
							<Graph
								id="graph-id" // id is mandatory
								data={this.data}
								config={this.myConfig}
							/>
						</div>
					</div >

				)
			this.showpath2 = null;
		}


		return (
			<main>
				<Switch>
					<motion.div className="App" initial="initial" exit="out" animate="in" variants={pageVariants} transition={pageTransition} >
						<div class="jumbotron">
							<h1 class="display-3">Politics</h1>
							<p class="lead">Enter a name to see how connected he/she is to 2 major parties</p>
							<hr class="my-2" />
							<p class="display-5">BJP or Congress!</p>
						</div>
						<div className="AppComponent">

							<div class="container">
								<AutoCompleteText ini="Enter A Name" changeName={this.changeName1} />


							</div>
						</div>
						<div className="subb1">
							<button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Connections with Parties</button>
						</div>


						{this.showpath}

					</motion.div>
				</Switch>
			</main>
		);
	}
}

export default App;
