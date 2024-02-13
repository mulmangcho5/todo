let taskInput = document.querySelector("#taskInput");
let addBtn = document.querySelector("#addBtn");
let taskList = [];
let taskBoard = document.querySelector("#taskBoard");

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render() {
    let resultHtml = "";

    for (let i = 0; i < taskList.length; i++) {
        resultHtml = resultHtml +
            `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>check</button>
            <button>delete</button>
        </div>
    </div>`

        taskBoard.innerHTML = resultHtml;
        console.log(resultHtml);
    }
}


addBtn.addEventListener("click", addTask)