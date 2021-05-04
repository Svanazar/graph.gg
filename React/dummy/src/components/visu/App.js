import React, { Component } from 'react';
import MaterialSwitch from '@material-ui/core/Switch';
import Switchh from "react-switch";
import './App.css';
import AutoCompleteText from './Autocomplete';
import Showrecos from './Showrecos';
import { Graph } from "react-d3-graph";
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { svg } from 'd3-fetch';
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// graph payload (with minimalist structure)
const pageVariants = {
	initial: {
		opacity: 0,
		x: "-100%",
		scale: 0.8
	},
	in: {
		opacity: 1,
		x: 0,
		scale: 1
	},
	out: {
		opacity: 0,
		x: "100%",
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
		this.showpath2 = null;
		this.showpath3 = null;

		this.state = {
			name1: '',
			name2: '',
			path: null,
			mutuals: null,
			recos: null,
			pressedRecos: 0,
			checked: false,
			node1: '',
			node2: ''
		};
		this.data = {
			nodes: [],
			links: [],
		};

		this.myConfig = {
			"automaticRearrangeAfterDropNode": true,
			"collapsible": false,
			"directed": false,
			"focusAnimationDuration": 0.75,
			"focusZoom": 1,
			"freezeAllDragEvents": false,
			"height": 400,
			"highlightDegree": 1,
			"highlightOpacity": 1,
			"linkHighlightBehavior": true,
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

		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(checked) {
		this.setState({ checked });
	}
	handleSubmit = async () => {

		this.showpath3 = null;
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

		this.showpath3 = null;
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

		let response2 = await fetch('/nametolink/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(this.state),
			credentials: 'include'
			// mode: 'cors'
		})
		if (response2.ok) { // if HTTP-status is 200-299
			// get the response2 body (the method explained below)
			let json = await response2.json();
			console.log(json["nodes"])

			this.setState({
				node1: json["nodes"][0],
				node2: json["nodes"][1],
			})

		} else {
			alert("HTTP-Error: " + response2.status);
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

		const onDoubleClickNode = function (nodeId, node) {
			// console.log(nodeId);
			var tmp = nodeId.replace(" ", "_");
			var link = "https://en.wikipedia.org/wiki/" + tmp;
			openInNewTab(link);
			// window.alert('Clicked node ${nodeId} in position (${node.x}, ${node.y})');
		};
		const openInNewTab = (url) => {
			const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
			if (newWindow) newWindow.opener = null
		}


		if (this.pressedShortest && !this.mutuals) {

			this.data.nodes = [];
			this.data.links = [];
			for (const node in this.state.path) {
				this.data.nodes.push({
					id: `${this.state.path[node][0]}`,
					svg: "https://" + `${this.state.path[node][1]}`,
					size: 500,
					fontSize: 18
				});
				if (node > 0) {
					this.data.links.push({ source: `${this.state.path[node][0]}`, target: `${this.state.path[node - 1][0]}` });
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
								onDoubleClickNode={onDoubleClickNode}
								config={this.myConfig}
							/>
						</div>
					</div >

				)
			this.showpath2 = null;
		}
		if (!this.pressedShortest && this.pressedMutuals) {

			if (this.state.name1 != '' && this.state.name2 != '') {


				this.data.nodes = [];
				this.data.links = [];
				this.data.nodes.push({
					id: `${this.state.name1}`,
					svg: "https://" + this.state.node1
				});
				this.data.nodes.push({
					id: `${this.state.name2}`,
					svg: "https://" + this.state.node2
				});

				for (const node in this.state.mutuals) {
					this.data.nodes.push({
						id: `${this.state.mutuals[node][0]}`,
						svg: "https://" + `${this.state.mutuals[node][1]}`
					});
					this.data.links.push({ source: `${this.state.mutuals[node][0]}`, target: `${this.state.name1}` });
					this.data.links.push({ source: `${this.state.mutuals[node][0]}`, target: `${this.state.name2}` });

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
									onDoubleClickNode={onDoubleClickNode}
								/>
							</div>
						</div >
					)

				this.showpath = null;
			}
			else {

				this.showpath = null;
				this.showpath2 = null;
				this.showpath3 = null;
				this.pressedMutuals = 0;
				this.pressedShortest = 0;
				window.alert("Please enter both names")
			}
		}

		if (this.state.pressedRecos === 1) {

			this.showpath = null;
			this.showpath2 = null;
			// console.log("lmao");
			// console.log(this.state);
			// this.showpath3 = (
			// 	<div>
			// 		<Showrecos thepath={this.state.recos} />
			// 	</div>

			// )
			this.data.nodes = [];
			this.data.links = [];
			var ind = 0
			const pos = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [3, 1]]
			// svg: "https://" + `${this.state.mutuals[node][1]}`
			for (const node in this.state.recos) {
				this.data.nodes.push({
					id: `${this.state.recos[node][0]}`,
					svg: "https://" + `${this.state.recos[node][1]}`,
					size: 50 * `${this.state.recos[node][2]}`,
					x: pos[ind][0] * 100,
					y: pos[ind][1] * 100,
				});
				// console.log(pos[ind][0])
				ind = ind + 1
			}
			this.showpath3 =
				(
					<div >
						<div className="thegraph">
							<Graph
								id="graph-id" // id is mandatory
								data={this.data}
								config={this.myConfig}
								onDoubleClickNode={onDoubleClickNode}
							/>
						</div>
					</div >
				)

			this.showpath2 = null;
			this.showpath = null;
			// 		< div >

			// 		<ul>
			// 			{this.state.recos.map((item, i) => <li> {`${item[0]} , ${item[1]}`} </li>)}
			// 		</ul>

			// </div >
		}

		return (
			<main>
				<Switch>
					<motion.div className="App" initial="initial" exit="out" animate="in" variants={pageVariants} transition={pageTransition} >
						<div class="jumbotron gg">
							<h1 class="display-3">Visualise</h1>
							<p class="lead">Enter any two names to see :</p>
							<h6>The shortest path</h6>
							<h6>Their mutual friends</h6>
							<hr class="my-2" />
							<p class="lead">Or enter a name to see :</p>
							<h6>Friend Recommendations</h6>
						</div>
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
							<div className="AliveSwitch">
								<label htmlFor="material-switch">
									<span>Include only Alive</span>
									<Switchh
										checked={this.state.checked}
										onChange={this.handleChange}
										onColor="#86d3ff"
										onHandleColor="#00c853"
										handleDiameter={30}
										uncheckedIcon={false}
										checkedIcon={false}
										boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
										activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
										height={20}
										width={48}
										className="react-switch"
										id="material-switch"
									/>
								</label>
							</div>
						</div>

						<div className="realstuff">
							{this.showpath}
							{this.showpath2}
							{this.showpath3}

						</div>

					</motion.div>
				</Switch>
			</main>
		);
	}
}

export default App;
