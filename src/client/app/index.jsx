import React from 'react';
import {render} from 'react-dom';
var marked=require('marked');
console.log(marked('I am using __markdown__.'));

class App extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	      input: ''
	    };
	  };

	  render() {
	    return  (
	    <div>
		    <UserInput handleChange={this.handleChange.bind(this)}/>
		    <UserOutput markup={this.state.input}/>
	    </div>
	    );
	  }

	  handleChange(e) {
	  	var markup = marked(e.target.value);
	  	console.log(markup);
	  	this.setState({
	  		input: markup
		});
	  }
}

class UserInput extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	      inputValue: ''
	    };
	  };

	propTypes: {
		name: React.PropTypes.string,
		handleChange: React.PropTypes.func
	}

	handleTyping(e) {
		//setting the state rerenders the react component. when we're typing into the box, react is almost instantly rerendering that component for us, our text isn't being rendered by the HTML.
		this.setState({
      		inputValue: e.target.value
    	});
    	this.props.handleChange(e);
	}

	render () {
		return (
			<div>
				<h2> {this.props.name} </h2>
				<input className="user-input" value={this.state.inputValue} onChange={this.handleTyping.bind(this)}/>
			</div>
		);
	}
}

class UserOutput extends React.Component {
	propTypes: {
		markup: React.PropTypes.string,
	}

	render() {
		return (
			<div className="user-output">
				<span>
					{this.props.markup}
				</span>
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));