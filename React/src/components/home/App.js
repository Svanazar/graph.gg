import React, { Component } from 'react';
import './App.css';
import sampleimg from '../../images/sample.png'
import { AnimatePresence, motion } from 'framer-motion';
import { Graph } from "react-d3-graph";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar'
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



	render() {



		return (
			<main>
				<Switch>
					<motion.div className="App" initial="initial" exit="out" animate="in" variants={pageVariants} transition={pageTransition} >
						<section
							className='hero is-fullheight is-family-  secondary'
							style={{
								backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(' + 'https://i.pinimg.com/originals/71/11/33/7111336ff9b8106c64c0fb6fc4ef4292.jpg' + ')',
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',

							}}>
							<div className='hero-body'>
								<div className='container'>
									<h1 className='display-1 title has-text-white is-family-secondary'>
										Graph.gg</h1>
									<h2 className='subtitle has-text-white is-family-secondary'>
										A graph network based web-app to visualise relationships between Indian celebrities built using Wikipedia data.</h2>
								</div>
							</div>
						</section>
						<section
							className='hero  is-fullheight is-family-  secondary'
							style={{
								backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(' + 'http://sharpic.github.io/hci-ds/figures/ml-big.jpg' + ')',
								backgroundPosition: 'center',
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',


							}}>
							<div className='hero-body x'>

								<div class="columns">

									<div class="column">

										<figure class="image is-4-3">
											<img src={sampleimg} />

										</figure>

									</div>
									<div class="column">
										<h1 class="display-5 title has-text-white is-family-secondary">
											Wonder how Kangana Ranaut knows Babar ?
											Here lies the answer !
											Lorem ipsum
											Lorem ipsum
											Lorem ipsum
										</h1>
									</div>
									<div class="column">
										<a class="btn btn-primary btn-lg" href="/visu" role="button">Start Visualising</a>
									</div>
								</div>
							</div>
						</section>

					</motion.div>
				</Switch>
			</main >
		);
	}
}

export default App;
