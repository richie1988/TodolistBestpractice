/* eslint-disable no-use-before-define */
import './style.css';
import clearCompletedTasks from './statusUtils.js';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(indexToDelete) {
  tasks.splice(indexToDelete, 1);
  // Update the indices of the remaining tasks
  for (let i = indexToDelete; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }

  saveTasks();
  renderTasks();
}

function createDeleteButton(index) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-button');

  deleteButton.addEventListener('click', () => {
    deleteTask(index);
  });

  return deleteButton;
}

export function renderTasks() {
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
      const deleteButton = createDeleteButton(index);
      taskItem.appendChild(deleteButton);
    }

    todoList.appendChild(taskItem);
  });

  saveTasks();
}

export function addTask(description) {
  const newIndex = tasks.length + 1;

  const newTask = {
    description,
    completed: false,
    index: newIndex,
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
    clearCompletedTasks(tasks);
    renderTasks();
  });
});

export { tasks };
export function editTaskDescription(indexToEdit, newDescription) {
  tasks[indexToEdit - 1].description = newDescription;
  saveTasks();
  renderTasks();
}

export function updateTaskStatus(taskIndex, completed) {
  tasks[taskIndex - 1].completed = completed;
  saveTasks();
  renderTasks();
}
