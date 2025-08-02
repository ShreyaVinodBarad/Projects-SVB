let displayError = document.getElementById("displayError");
let displayTasks = document.getElementById("taskContainer");
let taskInput = document.getElementById("taskInp");
let taskIdCounter = 0;
function addTask() {
    if (taskInput.value === "") {
        displayError.innerHTML = `<div class = "alert alert-danger">
        You must write something!
        </div>`;
    }
    else {
        displayError.innerHTML = "";
        taskIdCounter++;
        let uniqueTaskId = `task-${taskIdCounter}`;
        displayTasks.innerHTML += `
        <li style="list-style: none;" class="d-flex align-items-center justify-content-between mt-3" id="${uniqueTaskId}">
        <div class="d-flex gap-2 align-items-center" onclick = "taskCompleted(this)">
        <img src="./Assets/UncheckedImg.png" style="border-radius: 50%;" width="30px" height="30px">
        <h5 class="mb-0">${taskInput.value}</h5>
        </div>
        <button type="button" class="btn btn-danger rounded-circle p-0" style="width: 25px; height: 25px;" onclick = "deleteTask('${uniqueTaskId}')">
            <i class="bi bi-x-circle"></i>
        </button>
        </li>`
    }
    resetInp();
    saveDataAfterRefresh();
}
function taskCompleted(taskDiv) {
    let taskImg = taskDiv.querySelector("img");
    let taskText = taskDiv.querySelector("h5");
    if (taskText.style.textDecoration === "line-through") {
        taskText.style.textDecoration = "none";
        taskImg.src = "./Assets/UncheckedImg.png";
        saveDataAfterRefresh();
    }
    else {
        taskText.style.textDecoration = "line-through";
        taskImg.src = "./Assets/CheckedImg.png";
        saveDataAfterRefresh();
    }
}

function deleteTask(taskId) {
    document.getElementById(taskId).remove();
    saveDataAfterRefresh();
}

function resetInp() {
    taskInput.value = "";

}

function saveDataAfterRefresh() {
    localStorage.setItem("data", taskContainer.innerHTML);
    /*
    👆
    - This defines a function named saveDataAfterRefresh. You can call it whenever you want to save your task list.
    - This saves your task list into the browser’s memory (called localStorage) using the key "data".
    - taskContainer.innerHTML means the function takes all the HTML inside the <ul> element (the list of tasks) and stores it.
    - So, it’s like saying:
    “Browser, please remember this task list and store it under the name ‘data’.”
    */
}

function showSavedDataAfterRefresh() {
    taskContainer.innerHTML = localStorage.getItem("data");
    /*
    👆
    - It's used to load the saved task list when the page opens or reloads.
    - taskContainer.innerHTML = localStorage.getItem("data");
    - “Get the saved task list from localStorage (the item with key 'data') and show it inside the <ul> element with id="taskContainer".”
    */
}
showSavedDataAfterRefresh();