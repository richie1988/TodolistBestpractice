import { renderTasks, saveTasks } from "./index.js";
//
export default function clearCompletedTasks(tasks) {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  return incompleteTasks;

  /*const completedTaskIndices = [];

  const updateTasks = tasks.forEach((task, index) => {
    if (task.completed === true) {
      completedTaskIndices.push(index);
    }
  });

  for (let i = completedTaskIndices.length - 1; i >= 0; i -= 1) {
    tasks.splice(completedTaskIndices[i], 1);
  }

  return updateTasks;*/

  /*saveTasks();
  renderTasks();

  updateIndex();
  updateLocalStorage();
  renderTasks();*/
  /*const updatedTasks = tasks.filter((task) => !task.completed);

  updatedTasks.forEach((task, index) => {
    task.index = index + 1;
  });

  return updatedTasks;*/
}
