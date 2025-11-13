import AppDispatcher from '../dispatcher/Dispatcher';

const TodoActions = {
  addTodo: function(text) {
    AppDispatcher.dispatch({
      actionType: 'ADD_TODO',
      text: text
    });
  },
  deleteTodo: function(id) {
    AppDispatcher.dispatch({
      actionType: 'DELETE_TODO',
      id: id
    });
  }
};

export default TodoActions;
