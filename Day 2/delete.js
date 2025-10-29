// Small utility file for deletion helpers. The main event handlers live in script.js.
function deleteCompletedTasks(){
  const todoList = document.getElementById('taskList');
  if(!todoList) return;
  const completed = todoList.querySelectorAll('li.completed');
  completed.forEach(t => t.remove());
}

// Expose to window for manual invocation from console or markup
window.deleteCompletedTasks = deleteCompletedTasks;
