import React from 'react';
import {render} from 'react-dom';
var marked=require('marked');

class App extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    var string = 'Header 1\n =======\n Header 2\n -----------\n ### Header 3 \n Paragraphs are separated by a blank line. \n\n Leave 2 spaces at the end of a line to do a line break \n\n Text attributes *italic*, **bold**, `monospace`, ~~strikethrough~~ . \n\n Numbered list:  1. apple  2. oranges  3. pears \n\n *[Scott Gangemi](http://www.scottgangemi.com)*';
		var markup = marked(string, {sanitize: true});
	    this.state = {
	      input: markup
	    };
	  };

	  render() {
	    return  (
	    	<div className="container">
			    <div className="row">
				    <UserInput handleChange={this.handleChange.bind(this)}/>
				    <UserOutput markup={this.state.input}/>
			    </div>
	    	</div>
	    );
	  }



	  handleChange(e) {
	  	var markup = marked(e.target.value, {sanitize: true});
	  	this.setState({
	  		input: markup
		});
	  }
}

class UserInput extends React.Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	      inputValue: 'Header 1\n =======\n Header 2\n -----------\n ### Header 3 \n Paragraphs are separated by a blank line. \n\n Leave 2 spaces at the end of a line to do a line break \n\n Text attributes *italic*, **bold**, `monospace`, ~~strikethrough~~ . \n\n Numbered list:  1. apple  2. oranges  3. pears \n\n *[Scott Gangemi](http://www.scottgangemi.com)*'
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
			<div className="col-md-6">
				<textarea id="user-input" value={this.state.inputValue} onChange={this.handleTyping.bind(this)}/>
			</div>
		);

		//document.getElementById("user-input").onchange();
		var element = document.getElementById('just_an_example');
		var event = new Event('change');
		element.dispatchEvent(event);
	}
}

class UserOutput extends React.Component {
	propTypes: {
		markup: React.PropTypes.string,
	}

	createMarkup() {
		return {__html: this.props.markup};
	}

	render() {
		return (
			<div className='col-md-6'>
				<div dangerouslySetInnerHTML={this.createMarkup()} />
			</div>
		);
	}
}

render(<App/>, document.getElementById('app'));