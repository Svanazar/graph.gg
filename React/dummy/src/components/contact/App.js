import React, { Component } from 'react';
import './App.css';
import { Graph } from "react-d3-graph";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar'
// graph payload (with minimalist structure)
import { AnimatePresence, motion } from 'framer-motion';

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
        this.state = { value: '', value2: '', value3: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleChange2(event) {
        this.setState({ value2: event.target.value });
    }
    handleChange3(event) {
        this.setState({ value3: event.target.value });
    }

    handleSubmit = async () => {
        let response = await fetch('/adduser/', {
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

            window.alert("Thanks for contacting us!");




        } else {
            alert("HTTP-Error: " + response.status);
        }
    }
    render() {



        return (
            <main>
                <Switch>
                    <motion.div className="App" initial="initial" exit="out" animate="in" variants={pageVariants} transition={pageTransition} >

                        <div class="container">
                            <div class="section-title">
                                <h1>Suggestions</h1>
                            </div>
                            <h3>Please enter your name and the celebrity you would like to add!</h3>

                        </div>
                        <div className="theform">
                            <form className="form-group" onSubmit={this.handleSubmit}>

                                <input type="text" value={this.state.value} onChange={this.handleChange} class="form-control my-2" placeholder="Enter your Name" />

                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                <input type="text" value={this.state.value2} onChange={this.handleChange2} class="form-control my-2" placeholder="Enter wikipedia link of celebrity" />
                                <textarea onChange={this.handleChange3} class="md-textarea form-control my-2" rows="3" placeholder="Feedback" ></textarea>

                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </motion.div>
                </Switch>
            </main >
        );
    }
}

export default App;
