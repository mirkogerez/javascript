const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const totalTasksSpan = document.getElementById('total-tasks');
const pendingTasksSpan = document.getElementById('pending-tasks');
const completedTasksSpan = document.getElementById('completed-tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const addTask = () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    Swal.fire('Error', 'La tarea no puede estar vacía', 'error');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  
  tasks.push(newTask);
  taskInput.value = '';
  saveTasks();
  renderTasks();
};

const renderTasks = () => {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', 'animate__animated', 'animate__fadeIn');
    if (task.completed) taskItem.classList.add('completed');

    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="complete-btn" onclick="toggleComplete(${task.id})">✓</button>
        <button class="edit-btn" onclick="editTask(${task.id})">✎</button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">✖</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });

  updateTaskSummary();
};

const updateTaskSummary = () => {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  totalTasksSpan.textContent = totalTasks;
  pendingTasksSpan.textContent = pendingTasks;
  completedTasksSpan.textContent = completedTasks;
};

const deleteTask = (taskId) => {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
};

const editTask = (taskId) => {
  const task = tasks.find(task => task.id === taskId);
  const newText = prompt('Editar tarea:', task.text);
  if (newText) {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
};

const toggleComplete = (taskId) => {
  const task = tasks.find(task => task.id === taskId);
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
};

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromAPI = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    tasks = data.map(task => ({ id: task.id, text: task.title, completed: task.completed }));
    saveTasks();
    renderTasks();
  } catch (error) {
    Swal.fire('Error', 'No se pudieron cargar las tareas desde la API', 'error');
  }
};

addTaskBtn.addEventListener('click', addTask);
window.addEventListener('DOMContentLoaded', loadTasksFromAPI);
