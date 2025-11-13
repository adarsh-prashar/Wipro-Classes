import React, { Component } from 'react';
import TodoActions from '../actions/TodoActions';

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      inputText: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim()) {
      TodoActions.addTodo(this.state.inputText);
      this.setState({
        inputText: ''
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add a todo"
            value={this.state.inputText}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddTodo;
