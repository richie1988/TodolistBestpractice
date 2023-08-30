// index.test.js
import { addTask, deleteTask } from './index.js';

describe('To-Do App', () => {
  beforeEach(() => {
    // Set up a clean environment before each test
    document.body.innerHTML = '<div id="todo-list"></div>';
    localStorage.clear();
  });

  test('renders tasks correctly', () => {
    // Write test code to simulate rendering tasks and check the expected behavior

  });

  test('adds a task', () => {
    // Simulate adding a task using the addTask function
    const newTaskDescription = 'New Task';
    addTask(newTaskDescription);

    // Check the rendered output in the DOM
    const taskItems = document.querySelectorAll('li');
    expect(taskItems.length).toBe(1);

    const taskItem = taskItems[0];
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    const descriptionSpan = taskItem.querySelector('span');

    expect(checkbox.checked).toBe(false); // New tasks should be incomplete
    expect(descriptionSpan.textContent).toBe(newTaskDescription);

    // Check localStorage to verify the task was saved
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    expect(savedTasks.length).toBe(1);
    expect(savedTasks[0].description).toBe(newTaskDescription);
    expect(savedTasks[0].completed).toBe(false);
    expect(savedTasks[0].index).toBe(1);
  });

  test('deletes a task', () => {
    // Call deleteTask to simulate deleting a task
    deleteTask(1);
    // Write test assertions to check if the task is deleted and rendered
    const taskItems = document.querySelectorAll('li');
    expect(taskItems.length).toBe(1);

    // You can add more assertions to check task details if needed
  });

  // You can add more test cases as needed
});
