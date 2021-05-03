import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "react-loader-spinner";

import './Autocomplete.css'
export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);
        this.cnt = 0
        this.items = null


        this.state = {
            suggestions: [],
            text: '',
            ph: props.ini,
            cursor: 0,
            rendered: 0
        };

    }


    onTextChanged = (e) => {

        let value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            value = value.replace(/[^a-zA-Z0-9]/, "");
            const regex = new RegExp(`${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({
            suggestions,
            text: value,
            cursor: 0
        }));
        this.props.changeName(value)

    }

    renderSuggestions() {

        let { suggestions, cursor } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        let len = Math.min(suggestions.length, 8);
        suggestions = suggestions.splice(0, len);

        return (
            <ul>
                {suggestions.map((item, i) => <li onClick={() => this.suggestionSelected(item)}> {item} </li>)}
            </ul>
        );
    }

    suggestionSelected(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))

        this.props.changeName(value)

    }




    // < div className="AutoCompleteText" >

    handleSubmit = async () => {

        console.log(JSON.stringify(this.state))
        let response = await fetch('/collect-all/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: 'include'
            // mode: 'cors'

        })
        if (response.ok) { // if HTTP-status is 200-299
            // get the response body (the method explained below)
            let json = await response.json();
            console.log(json["alltext"])
            this.items = json["alltext"]

            this.setState(() => ({
                rendered: 1
            }))


        } else {
            alert("HTTP-Error: " + response.status);
        }
    }


    render() {



        const { text, ph, cursor } = this.state;
        if (this.cnt === 0) {
            this.cnt = 1;
            this.handleSubmit();
        }
        return (
            <div className="AutoCompleteText">


                {this.renderSuggestions()}
                {this.state.rendered === 0 &&
                    <Loader
                        type="Ball-Triangle"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                }
                {this.state.rendered === 1 &&
                    <input value={text} onChange={this.onTextChanged} onKeyDown={this.handleKeyDown} type="text" placeholder={ph} />

                }
            </div >
        )
    }
}