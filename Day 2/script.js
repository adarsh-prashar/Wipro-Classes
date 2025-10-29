// Core ToDo app JavaScript (works with the markup in ToDoApplication.html)
// Select DOM elements
const todoInput = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskButton');
const todoList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompleted');

function createTaskElement(text){
    const li = document.createElement('li');
    li.className = 'task-item';

    const left = document.createElement('div');
    left.className = 'task-left';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    left.appendChild(span);

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'btn-icon delete';
    del.setAttribute('aria-label','Delete task');
    del.textContent = '✕';

    actions.appendChild(del);

    li.appendChild(left);
    li.appendChild(actions);

    return li;
}

function addTask(){
    const taskText = todoInput.value.trim();
    if(!taskText) return;
    const li = createTaskElement(taskText);
    todoList.appendChild(li);
    todoInput.value = '';
    todoInput.focus();
}

// register event handlers
addButton && addButton.addEventListener('click', addTask);
todoInput && todoInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') addTask(); });

// list click handler: toggle complete or delete
todoList && todoList.addEventListener('click', function(e){
    const btn = e.target.closest('button');
    const li = e.target.closest('li');
    if(!li) return;
    if(btn && btn.classList.contains('delete')){
        li.remove();
        return;
    }
    // clicking the text toggles completion
    if(e.target.classList.contains('task-text')){
        li.classList.toggle('completed');
    }
});

// clear completed convenience hook (may be called from delete.js)
function clearCompleted(){
    const completed = todoList.querySelectorAll('li.completed');
    completed.forEach(c => c.remove());
}

if(clearCompletedBtn){
    clearCompletedBtn.addEventListener('click', clearCompleted);
}

// expose a debug helper
window.clearCompletedTasks = clearCompleted;




    