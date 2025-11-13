# TODO: Add Delete Task Button

- [x] Update TodoActions.js to add deleteTodo function that dispatches 'DELETE_TODO' with the todo id.
- [x] Update TodoStore.js to add deleteTodo method that removes the todo by id, and handle 'DELETE_TODO' in handleActions to call deleteTodo and emit change.
- [x] Update TodoList.js to add a delete button next to each todo text, with onClick calling TodoActions.deleteTodo(todo.id).
