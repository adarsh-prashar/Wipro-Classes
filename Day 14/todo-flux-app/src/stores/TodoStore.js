import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';

class TodoStore extends EventEmitter {
  constructor() {
    super();
    this.todos = [];
  }

  getAll() {
    return this.todos;
  }

  addTodo(text) {
    this.todos.push({
      id: Date.now(),
      text: text,
      complete: false
    });
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  handleActions(action) {
    switch(action.actionType) {
      case 'ADD_TODO':
        this.addTodo(action.text);
        this.emit('change');
        break;
      case 'DELETE_TODO':
        this.deleteTodo(action.id);
        this.emit('change');
        break;
      default:
        // do nothing
    }
  }
}

const todoStore = new TodoStore();
AppDispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
