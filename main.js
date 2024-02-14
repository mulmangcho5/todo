let taskInput = document.querySelector("#taskInput");
let addBtn = document.querySelector("#addBtn");
let taskList = [];
let taskBoard = document.querySelector("#taskBoard");

function addTask() {
    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let resultHtml = "";

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
            resultHtml = resultHtml +
                `<div class="task">
        <div class="taskDone">${taskList[i].taskContent}</div>
        <div>
            <button class="btnNone" onclick="togleComplete('${taskList[i].id}')">🔄</button>
            <button class="btnNone" onclick="deleteTask('${taskList[i].id}')">❌</button>
        </div>
    </div>`
        } else {
            resultHtml = resultHtml +
                `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button class="btnNone" onclick="togleComplete('${taskList[i].id}')">✅</button>
            <button class="btnNone" onclick="deleteTask('${taskList[i].id}')">❌</button>
        </div>
    </div>`
        }

        // taskBoard.innerHTML = resultHtml;
        // console.log(resultHtml);
    }
    taskBoard.innerHTML = resultHtml;
}

function togleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    console.log(taskList);
    render();
}

function randomIdGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

addBtn.addEventListener("click", addTask)