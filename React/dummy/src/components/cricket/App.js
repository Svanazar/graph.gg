import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
class App extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <div className="App" >
                        <div class="jumbotron">
                            <h1 class="display-3">Cricket</h1>
                            <p class="lead">CLick any button to see various relations</p>
                            <hr class="my-2" />
                            <p class="lead">
                                <a class="btn btn-primary btn-lg" href="/cricket1" role="button">State -> IPL Teams</a>
                                <a class="btn btn-primary btn-lg" href="/cricket2" role="button">IPL Teams -> States</a>
                            </p>
                        </div>

                    </div>
                </Switch>
            </main>
        );
    }
}
export default App;
