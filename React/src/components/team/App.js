import React, { Component } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { Switch } from 'react-router-dom';
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




	render() {



		return (
			<main>
				<Switch>
					<motion.div className="App" initial="initial" exit="out" animate="in" variants={pageVariants} transition={pageTransition} >

						<div class="container">
							<div class="section-title">
								<h1>Meet the Team</h1>
							</div>
							<div class="row">
								<div class="column">
									<div class="team-4">
										<div class="team-content">
											<h2>Aditya Trivedi</h2>
											<h3>atrivedi [AT] iitg.ac.in</h3>
										</div>
										<div class="team-img">
											<img src={require("./img/aditya.jpg")} alt="Team Image" />
											<div class="team-content">
												<p>Primarily worked on building React based Frontend and integrated the Django backend</p>
											</div>
										</div>
										<div class="team-content">
											<div class="team-social">

												<a class="social-fb" href="https://www.facebook.com/aditya.trivedi.9028/" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
												<a class="social-li" href="https://www.linkedin.com/in/trivedi-aditya/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
												<a class="social-in" href="https://www.instagram.com/adityatrivediii/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
												<a class="social-gi" href="https://github.com/ad1tyat" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>

											</div>
										</div>
									</div>
								</div>
								<div class="column">
									<div class="team-4">
										<div class="team-content">
											<h2>Atharva Varde</h2>
											<h3>v.atharva [AT] iitg.ac.in</h3>
										</div>
										<div class="team-img">
											<img src={require("./img/atharva.jpg")} alt="Team Image" />
											<div class="team-content">
												<p>Worked on collection of data and built the Neo4J database</p>
											</div>
										</div>
										<div class="team-content">
											<div class="team-social">

												<a class="social-fb" href="https://www.facebook.com/profile.php?id=100009062382260" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
												<a class="social-li" href="https://www.linkedin.com/in/atharva-varde-643a05197/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
												<a class="social-in" href="https://www.instagram.com/kinginthenorth_561/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
												<a class="social-gi" href="https://github.com/varde2407" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
											</div>
										</div>
									</div>
								</div>
								<div class="column">
									<div class="team-4">
										<div class="team-content">
											<h2>Shashwat Sharma</h2>
											<h3>shashwat.sharma [AT] iitg.ac.in</h3>
										</div>
										<div class="team-img">
											<img src={require("./img/shash.png")} alt="Team Image" />
											<div class="team-content">
												<p>Optimised the scraping and worked on Django-Neo4J integration</p>
											</div>
										</div>
										<div class="team-content">
											<div class="team-social">

												<a class="social-fb" href="https://www.facebook.com/shashwat.sharma.5209" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
												<a class="social-li" href="" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
												<a class="social-in" href="https://www.instagram.com/watshashwat/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
												<a class="social-gi" href="https://github.com/Svanazar" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</motion.div>
				</Switch>
			</main >
		);
	}
}

export default App;
