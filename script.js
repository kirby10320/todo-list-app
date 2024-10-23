// Select elements from the DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const deadlineInput = document.getElementById('deadline-input');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listener for adding a task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(taskInput.value, deadlineInput.value);
  taskInput.value = '';
  deadlineInput.value = '';
});

// Function to add a task
function addTask(task, deadline) {
  const li = document.createElement('li');

  li.innerHTML = `
    <span>${task} (by: ${new Date(deadline).toLocaleString()})</span>
    <div>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">❌</button>
    </div>
  `;

  // Add event listeners to buttons
  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  const tasks = Array.from(taskList.children).map((li) => ({
    task: li.querySelector('span').textContent,
    completed: li.classList.contains('completed'),
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(({ task, completed }) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <div>
        <button class="complete-btn">✔</button>
        <button class="delete-btn">❌</button>
      </div>
    `;
    if (completed) {
      li.classList.add('completed');
    }
    li.querySelector('.complete-btn').addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks();
    });
    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      saveTasks();
    });
    taskList.appendChild(li);
  });
}
