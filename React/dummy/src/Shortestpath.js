import React from 'react'
import './Shortestpath.css'
export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);

        this.items = props.thepath;

        this.state = {
            suggestions: [],
            text: '',
            ph: props.ini,
            cursor: 0
        };
    }






    render() {
        const { text, ph, cursor } = this.state;

        return (
            <div className="ShortestPath">
                <ul>
                    {this.items.map((item, i) => <li> {item} </li>)}
                </ul>
            </div >
        )
    }
}