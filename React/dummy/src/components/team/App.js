import React, { Component } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';

class App extends Component {




	render() {



		return (
			<main>
				<Switch>
					<div className="App" >

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
												<p>CEO of Frontend</p>
											</div>
										</div>
										<div class="team-content">
											<div class="team-social">

												<a class="social-fb" href="https://www.facebook.com/aditya.trivedi.9028/"><i class="fab fa-facebook-f"></i></a>
												<a class="social-li" href="https://www.linkedin.com/in/trivedi-aditya/"><i class="fab fa-linkedin-in"></i></a>
												<a class="social-in" href="https://www.instagram.com/adityatrivediii/"><i class="fab fa-instagram"></i></a>

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
												<p>CEO of Scraping</p>
											</div>
										</div>
										<div class="team-content">
											<div class="team-social">

												<a class="social-fb" href="https://www.facebook.com/profile.php?id=100009062382260"><i class="fab fa-facebook-f"></i></a>
												<a class="social-li" href="https://www.linkedin.com/in/atharva-varde-643a05197/"><i class="fab fa-linkedin-in"></i></a>
												<a class="social-in" href="https://www.instagram.com/kinginthenorth_561/"><i class="fab fa-instagram"></i></a>

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
												<p>CEO of Backend</p>
											</div>
										</div>
										<div class="team-content">
											<div class="team-social">

												<a class="social-fb" href="https://www.facebook.com/shashwat.sharma.5209"><i class="fab fa-facebook-f"></i></a>
												<a class="social-li" href=""><i class="fab fa-linkedin-in"></i></a>
												<a class="social-in" href="https://www.instagram.com/watshashwat/"><i class="fab fa-instagram"></i></a>

											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</Switch>
			</main >
		);
	}
}

export default App;
