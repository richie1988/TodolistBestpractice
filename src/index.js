import './style.css';
import clearCompletedTasks from './statusUtils.js';

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const todoList = document.getElementById('todo-list');

  tasks.sort((a, b) => a.index - b.index);

  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    taskItem.appendChild(checkbox);

    const descriptionSpan = document.createElement('span');
    descriptionSpan.textContent = task.description;

    if (task.completed) {
      descriptionSpan.classList.add('completed');
    }

    taskItem.appendChild(descriptionSpan);

    if (!task.completed) {
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.classList.add('delete-button');

      deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);

        tasks.forEach((task, index) => {
          task.index = index + 1;
        });

        saveTasks();
        renderTasks();
      });

      taskItem.appendChild(deleteButton);
    }

    todoList.appendChild(taskItem);
  });

  saveTasks();
}

function addTask(description) {
  const newIndex = tasks.length + 1;

  const newTask = {
    description,
    completed: false,
    index: newIndex
  };

  tasks.push(newTask);
  renderTasks();
}

window.addEventListener('DOMContentLoaded', () => {
  renderTasks();

  const addButton = document.querySelector('.add-btn');
  const addInput = document.querySelector('.add-todo');

  addButton.addEventListener('click', () => {
    if (addInput.value.trim() !== '') {
      addTask(addInput.value.trim());
      addInput.value = '';
    }
  });

  const clearButton = document.querySelector('.clear-btn');
  clearButton.addEventListener('click', () => {
    tasks = clearCompletedTasks(tasks);
    renderTasks();
  });
});