showTasks();
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  const addTxt = document.getElementById("addTxt");
  const addTitle = document.getElementById("addTitle");
  const messageCheckbox = document.getElementById("messageCheckbox");

  let tasks = localStorage.getItem("tasks");
  let i = 0;
  let j = 0;
  if (messageCheckbox.checked) {
    if (tasks == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(tasks);
    }

    let nCount = i +1;
    let myObj = {
      title: addTitle.value,
      text: addTxt.value,
      impStatus: true,
      count: nCount,
    };

    taskObj.push(myObj);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    addTitle.value = "";
    addTxt.value = "";
    showTasks();
  } 
  else {
    if (tasks == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(tasks);
    }
    let mCount = j +1;
    let myObj = {
      title: addTitle.value,
      text: addTxt.value,
      impStatus: false,
      count: mCount,
    };

    taskObj.push(myObj);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    addTitle.value = "";
    addTxt.value = "";
    showTasks();
  }
});

function showTasks() {
  let tasks = localStorage.getItem("tasks");
  if (tasks == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(tasks);
  }
  impTskHtml = "";
  tskHtml = "";
  taskObj.forEach(function (element, index) {
    if (element.impStatus == false) {
      tskHtml += `
      <div id="${
        index + 1
      }" class="taskCard my-2 mx-2 card" style="width: 18rem;">
      <div class="card-body">
      <h5 id="${index + 11}" class="card-title">Note ${index + 1}: ${
        element.title
      }</h5>
      <p id="${index + 13}" class="card-text"> ${element.text}</p>
      <button id="${
        index + 3
      }" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
      <button id="${
        index + 5
      }" onclick="doneTask(this.id)"  class="btn btn-success">Done</button>
      <button id="${
        index + 7
      }" onclick="undoTask(this.id)"  class="btn btn-success" style="display:none;">Undo</button>
      <button id="${
        index + 9
      }" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
      </div>
      </div>`;
    } 
    else {      
      impTskHtml += `
      <div id="${
        index + 1
      }" class="taskCard my-2 mx-2 card" style="width: 18rem; background-color: #ff8a8a;">
      <div class="card-body">
      <h5 id="${index + 11}" class="card-title">Note ${index + 1}: ${
        element.title
      }</h5>
              <p id="${index + 13}" class="card-text"> ${element.text}</p>
              <button id="${
                index + 3
              }" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
              <button id="${
                index + 5
              }" onclick="doneTask(this.id)"  class="btn btn-success">Done</button>
              <button id="${
                index + 7
              }" onclick="undoTask(this.id)"  class="btn btn-success" style="display:none;">Undo</button>
              <button id="${
                index + 9
              }" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
              </div>
              </div>`;
    }
    impTaskFunc(impTskHtml);
    taskFunc(tskHtml);
  });
}

function impTaskFunc(params) {
  let impTaskDiv = document.getElementById("impTaskDiv");
  impTaskDiv.style.display = "flex";

  if (params.length != 0) {
    impTaskDiv.innerHTML = params;
  } else {
    impTaskDiv.innerHTML = `Nothing to show! Use "Add a Task" section above to add tasks.`;
  }
}

function taskFunc(params) {
  let allTasksDiv = document.getElementById("allTasksDiv");
  allTasksDiv.style.display = "flex";

  if (params.length != 0) {
    allTasksDiv.innerHTML = params;
  } else {
    allTasksDiv.innerHTML = `Nothing to show! Use "Add a Task" section above to add tasks.`;
  }
}

function editTask(params) {
  console.log(`hello, im editing ${params}`);
}

function doneTask(arg) {
  console.log(`hello: ${arg}`);
}

function deleteTask(params) {
  console.log(`hello, im deleting ${params}`);
}
