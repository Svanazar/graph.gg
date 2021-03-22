import React from 'react'
import './Autocomplete.css'
export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.cnt = 0
        this.items = null


        this.state = {
            suggestions: [],
            text: '',
            ph: props.ini,
            cursor: 0
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
                {suggestions.map((item, i) => <li className={cursor === i ? 'gg' : null} onClick={() => this.suggestionSelected(item)}> {item} </li>)}
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

    handleKeyDown(e) {
        console.log(e.keyCode);
        const { cursor, suggestions } = this.state;
        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && cursor > 0) {
            this.setState(prevState => ({
                cursor: prevState.cursor - 1,
            }))
        } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
            this.setState(prevState => ({
                cursor: prevState.cursor + 1,
            }))
        }
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

                <input value={text} onChange={this.onTextChanged} onKeyDown={this.handleKeyDown} type="text" placeholder={ph} />
                {this.renderSuggestions()}

            </div >
        )
    }
}