import React, { Component } from 'react';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: TodoStore.getAll()
    };
    this.updateTodos = this.updateTodos.bind(this);
  }

  componentDidMount() {
    TodoStore.on('change', this.updateTodos);
  }

  componentWillUnmount() {
    TodoStore.removeListener('change', this.updateTodos);
  }

  updateTodos() {
    this.setState({
      todos: TodoStore.getAll()
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => TodoActions.deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
