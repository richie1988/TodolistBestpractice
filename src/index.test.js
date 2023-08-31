// index.test.js
import {
  addTask,
  deleteTask,
  editTaskDescription,
  updateTaskStatus,
} from "./index.js";
import clearCompletedTasks from "./statusUtils.js";

describe("To-Do App", () => {
  beforeEach(() => {
    // Set up a clean environment before each test
    document.body.innerHTML = '<div id="todo-list"></div>';
    localStorage.clear();
  });

  test("renders tasks correctly", () => {
    // Write test code to simulate rendering tasks and check the expected behavior
  });

  test("adds a task", () => {
    // Simulate adding a task using the addTask function
    const newTaskDescription = "New Task";
    addTask(newTaskDescription);

    // Check the rendered output in the DOM
    const taskItems = document.querySelectorAll("li");
    expect(taskItems.length).toBe(1);

    const taskItem = taskItems[0];
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    const descriptionSpan = taskItem.querySelector("span");

    expect(checkbox.checked).toBe(false); // New tasks should be incomplete
    expect(descriptionSpan.textContent).toBe(newTaskDescription);

    // Check localStorage to verify the task was saved
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    expect(savedTasks.length).toBe(1);
    expect(savedTasks[0].description).toBe(newTaskDescription);
    expect(savedTasks[0].completed).toBe(false);
    expect(savedTasks[0].index).toBe(1);
  });

  test("deletes a task", () => {
    // Call deleteTask to simulate deleting a task
    deleteTask(1);
    // Write test assertions to check if the task is deleted and rendered
    const taskItems = document.querySelectorAll("li");
    expect(taskItems.length).toBe(1);

    // You can add more assertions to check task details if needed
  });

  test("edits a task description", () => {
    // Add a task using the addTask function
    const taskDescription = "Initial Task Description";
    addTask(taskDescription);

    // Simulate editing the task description
    const newDescription = "Updated Task Description";
    editTaskDescription(1, newDescription);

    // Check if the description has been updated in DOM and localStorage
    const descriptionSpan = document.querySelector("span");
    expect(descriptionSpan.textContent).toBe(newDescription);

    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    expect(savedTasks[0].description).toBe(newDescription);
  });

  test("clears all completed tasks", () => {
    // Create a local array of tasks
    const tasks = [
      { description: "Task 1", completed: true, index: 1 },
      { description: "Task 2", completed: false, index: 2 },
    ];

    // Simulate clearing completed tasks using the imported function
    const remainingTasks = clearCompletedTasks(tasks);

    // Check if only incomplete tasks remain
    expect(remainingTasks.length).toBe(1);
    expect(remainingTasks[0].description).toBe("Task 2");
    expect(remainingTasks[0].completed).toBe(false);
  });

  test("updates an item's completed status", () => {
    // Mock localStorage methods
    const localStorageMock = (function localStorageMock() {
      let store = {};

      return {
        getItem(key) {
          return store[key] || null;
        },
        setItem(key, value) {
          store[key] = value.toString();
        },
        clear() {
          store = {};
        },
      };
    })();

    // Replace the global localStorage with the mock version
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    // Add a task using the addTask function
    const taskDescription = "Task";
    addTask(taskDescription);

    // Simulate completing the task
    updateTaskStatus(1, true);

    // Retrieve and parse tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    // Check if the task is completed
    expect(savedTasks[0].completed).toBe(true);
  });
});
