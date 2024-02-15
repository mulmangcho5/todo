let taskInput = document.querySelector("#taskInput");
let addBtn = document.querySelector("#addBtn");
let tabs = document.querySelectorAll(".taskTabs div");
let taskList = [];
let filterList = [];
let taskBoard = document.querySelector("#taskBoard");
let mode = "all";


addBtn.addEventListener("click", handleTaskAddition);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') { 
        handleTaskAddition();
        event.preventDefault(); 
    }
});

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (e) { filter(e) });
}


function addTask() {
    if (taskInput.value.trim() === '') {
        return;
    }

    let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };

    taskList.push(task);
    taskInput.value = ''; 
    render();
}

function render() {
    let list = [];

    if (mode === "all") {
        list = taskList;
    } else if (mode === "ongoing" || mode === "done") {
        list = filterList;
    }



    let resultHtml = "";

    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHtml = resultHtml +
                `<div class="task">
        <div class="taskDone">${list[i].taskContent}</div>
        <div>
            <button class="btnNone" onclick="togleComplete('${list[i].id}')">🔄</button>
            <button class="btnNone" onclick="deleteTask('${list[i].id}')">❌</button>
        </div>
    </div>`
        } else {
            resultHtml = resultHtml +
                `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button class="btnNone" onclick="togleComplete('${list[i].id}')">✅</button>
            <button class="btnNone" onclick="deleteTask('${list[i].id}')">❌</button>
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
    // console.log(taskList);
    render();
}

function randomIdGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);

    if (mode === "ongoing") {
        filterList = filterList.filter(task => task.id !== id);
    } else if (mode === "done") {
        filterList = filterList.filter(task => task.id !== id);
    }

    render();
}

function filter(e) {
    mode = e.target.id;
    filterList = [];

    moveUnderline(e.target);

    if (mode === "all") {
        render();
    } else if (mode === "ongoing") {
        filterList = taskList.filter(task => !task.isComplete);
        render();
    } else if (mode === "done") {
        filterList = taskList.filter(task => task.isComplete);
        render();
    }
}

function moveUnderline(tab) {
    const underline = document.querySelector("#underLine");
    const tabLeft = tab.offsetLeft; 
    const tabWidth = tab.offsetWidth; 

    underline.style.left = `${tabLeft}px`; 
    underline.style.width = `${tabWidth}px`; 
}
moveUnderline(tabs[0]);


function handleTaskAddition() {
    if (taskInput.value.trim() === '') {

        alert("입력해주세요.");
    } else {
        addTask();
    }
}
