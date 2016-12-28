import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render() {
    return  (
    <div>
	    <UserInput handleChange={this.handleChange}/>
	    <UserOutput output="{this.state.input}"/>
    </div>
    );
  }

  handleChange(e) {
  	console.log(e.target.value);
  	//this.props.callback(event.target.value);
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
		name: React.PropTypes.string
	}

	handleTyping(e) {
		//setting the state rerenders the react component. when we're typing into the box, react is almost instantly rerendering that component for us, our text isn't being rendered by the HTML.
		this.setState({
      		inputValue: e.target.value
    	});
    	this.props.handleChange(e);
    	//now need to pass the value up to the parent.
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