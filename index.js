//   START QUERY SELECTORS //

const taskForm = document.querySelector(".task-form");
const inputTask = document.getElementById("task-added");
const taskList = document.getElementById("task-list");
const deleteTask = document.querySelector(".exit");
const completedTask = document.querySelector(".complete");

// END QUERY SELECTORS //

//  FUNCTION TO SAVE TASK TO LOCAL STORAGE

const saveToLocalStorage = () => {
  const tasks = []; 
  taskList.querySelectorAll(".task").forEach((taskItem) => {
    tasks.push({ 
      text: taskItem.querySelector(".task-text").textContent, 
      complete: taskItem.querySelector(".complete").textContent === "☑ "
    });
  });
  
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
};

// FUNCTION TO READ AND DISPLAY THE TASK FROM LOCAL STORAGE

const getTasksFromLocalStorage = () => {

  const letTasks = JSON.parse(localStorage.getItem("tasks"))  || [];

  letTasks.forEach( (task) => {
    const newLiElement = document.createElement("li");
    newLiElement.classList = "task";
  

  const startSpanElement = document.createElement("span");
    startSpanElement.classList = "complete"; 
    startSpanElement.textContent = task.complete ? "☑ " : "☐ ";
    startSpanElement.addEventListener("click", () => {
      startSpanElement.textContent = startSpanElement.textContent === "☐ " ? "☑ " : "☐ ";
      taskTextContent.style.textDecorationLine = startSpanElement.textContent === "☑ " ? "line-through" : "";
      saveToLocalStorage();
    });

    const taskTextContent = document.createElement("span");
    taskTextContent.classList = "task-text";
    taskTextContent.textContent = task.text;
    if (task.completed) {
      taskTextContent.style.textDecorationLine = "line-through";
    };

    const endSpanElement = document.createElement("span");
    endSpanElement.classList = "exit";
    endSpanElement.textContent = "✗";
    endSpanElement.addEventListener("click", () => {
      newLiElement.remove();
      saveToLocalStorage();
    });

    newLiElement.appendChild(startSpanElement);
    newLiElement.appendChild(taskTextContent);
    newLiElement.appendChild(endSpanElement);

    taskList.appendChild(newLiElement);

    });
}; 

// WINDOW LOADING THE TASK FROM LOCAL STORAGE

window.addEventListener('load', () => {
  getTasksFromLocalStorage();
});


// EVENT LISTENER WHEN THE USER ADD A TASK

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = inputTask.value;
  if (taskText !== "") {

    // CREATING A LI ELEMENT FOR THE TASK

    const newLiElement = document.createElement("li");
    newLiElement.classList = "task";

    // USER MARKING THE TASK COMPLETE OR NOT

    const startSpanElement = document.createElement("span");
    startSpanElement.classList = "complete";
    startSpanElement.textContent = "☐ ";
    startSpanElement.addEventListener("click", () => {
      startSpanElement.textContent = startSpanElement.textContent === "☐ " ? "☑ " : "☐ ";
      taskTextContent.style.textDecorationLine = startSpanElement.textContent === "☑ " ? "line-through" : "";
      saveToLocalStorage();
    });
    
    const taskTextContent = document.createElement("span");
    taskTextContent.classList = "task-text";
    taskTextContent.textContent = taskText;

    // USER DELETING THE TASK

    const endSpanElement = document.createElement("span");
    endSpanElement.classList = "exit";
    endSpanElement.textContent = "✗";
    endSpanElement.addEventListener("click", () => {
      newLiElement.remove();
      saveToLocalStorage();
    });

    newLiElement.appendChild(startSpanElement);
    newLiElement.appendChild(taskTextContent);
    newLiElement.appendChild(endSpanElement);
   
    taskList.appendChild(newLiElement);
    inputTask.value = "";
    saveToLocalStorage();
  }
});
