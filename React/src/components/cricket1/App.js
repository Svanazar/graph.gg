import React, { Component } from 'react';
import './App.css';
import AutoCompleteText from './Autocomplete';
import Showrecos from './Showrecos';
import { Graph } from "react-d3-graph";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// graph payload (with minimalist structure)

class App extends Component {
	constructor(props) {
		super(props);
		this.showpath = null;
		this.showpath2 = null;
		this.showpath3 = null;

		this.state = {
			name1: '',
			name2: '',
			path: null,
			mutuals: null,
			recos: null,
			pressedRecos: 0,
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

		this.showpath2 = null;
		this.showpath = null;
		this.pressedMutuals = 0;
		this.pressedShortest = 1;
		this.setState({
			path: null,
			mutuals: null,
			recos: null,
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
	handleSubmit2 = async () => {

		this.showpath2 = null;
		this.showpath = null;
		this.pressedMutuals = 1;
		this.pressedShortest = 0;
		this.setState({
			path: null,
			mutuals: null,
			recos: null,
		})
		let response = await fetch('/mutuals/', {
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
			console.log(json["mutuals"])
			this.setState({
				mutuals: json["mutuals"],
				pressedRecos: 0,
			})


		} else {
			alert("HTTP-Error: " + response.status);
		}
	}

	handleSubmit3 = async () => {

		this.showpath3 = null;
		this.showpath2 = null;
		this.showpath = null;
		this.pressedMutuals = 0;
		this.pressedShortest = 0;




		this.setState({
			path: null,
			mutuals: null,
			recos: null,
		})
		let response = await fetch('/friendrecs/', {
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
			console.log(json)
			this.setState({
				recos: json["recos"],
				pressedRecos: 1,
			})

			console.log(this.state)
			console.log("GGWP")

		} else {
			alert("HTTP-Error: " + response.status);
		}
	}




	changeName1 = (newName) => {
		this.setState({
			name1: newName
		})
	}

	changeName2 = (newName) => {
		this.setState({
			name2: newName
		})
	}



	render() {



		if (this.pressedShortest && !this.mutuals) {

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
		if (!this.pressedShortest && this.pressedMutuals) {

			this.data.nodes = [];
			this.data.links = [];
			this.data.nodes.push({ id: `${this.state.name1}` });
			this.data.nodes.push({ id: `${this.state.name2}` });

			for (const node in this.state.mutuals) {
				this.data.nodes.push({ id: `${this.state.mutuals[node]}` });
				this.data.links.push({ source: `${this.state.mutuals[node]}`, target: `${this.state.name1}` });
				this.data.links.push({ source: `${this.state.mutuals[node]}`, target: `${this.state.name2}` });

			}

			// <Shortestpath thepath={this.state.mutuals} />
			this.showpath2 =
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

			this.showpath = null;

		}

		if (this.state.pressedRecos === 1) {

			this.showpath = null;
			this.showpath2 = null;
			console.log("lmao");
			console.log(this.state);
			this.showpath3 = (
				<div>
					<Showrecos thepath={this.state.recos} />
				</div>

			)

			// 		< div >

			// 		<ul>
			// 			{this.state.recos.map((item, i) => <li> {`${item[0]} , ${item[1]}`} </li>)}
			// 		</ul>

			// </div >
		}

		return (
			<main>
				<Switch>
					<div className="App" >

						<div className="AppComponent">

							<div class="container">
								<div class="row">
									<div class="col-sm-6">
										<AutoCompleteText ini="Enter Name 1" changeName={this.changeName1} />
									</div>
									<div class="col-sm-6">
										<AutoCompleteText ini="Enter Name 2" changeName={this.changeName2} />
									</div>
								</div>
							</div>
						</div>
						<div className="subb1">
							<button type="submit" onClick={this.handleSubmit} class="btn btn-primary">Shortest Path</button>
							<button type="submit" onClick={this.handleSubmit2} class="btn btn-primary">Mutual Friends</button>
							<button type="submit" onClick={this.handleSubmit3} class="btn btn-primary">Friend Recommendations</button>
						</div>


						{this.showpath}
						{this.showpath2}
						{this.showpath3}

					</div>
				</Switch>
			</main>
		);
	}
}

export default App;
