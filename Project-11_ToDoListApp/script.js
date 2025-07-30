let displayTasks = document.getElementById("displayResult");
let taskInput = document.getElementById("taskInp");
function addTask() {
    if (taskInput.value === "") {
        displayTasks.innerHTML = `<div class = "alert alert-danger">
        You must write something!
        </div>`;
    }
    else {
        displayTasks.innerHTML = `<div>
        <ul class="text-start ps-0">
            <li style="list-style: none;" class="d-flex gap-2 align-items-center">
            <img src="./Assets/UncheckedImg.png" style="border-radius: 50%;" width="30px" height="30px">
            <h5 class="mb-0">${taskInput.value}</h5>
            </li>
        </ul>
        </div>`
    }
    resetInp();
}
function resetInp() {
    taskInput.value = "";
}