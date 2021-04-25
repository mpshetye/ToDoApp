showTasks();
showDone();
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  const addTxt = document.getElementById("addTxt");
  const addTitle = document.getElementById("addTitle");
  const messageCheckbox = document.getElementById("messageCheckbox");

  let tasks = localStorage.getItem("tasks");
  if (messageCheckbox.checked) {
    if (tasks == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(tasks);
    }

    let myObj = {
      title: addTitle.value,
      text: addTxt.value,
      impStatus: true,
      index: indexFunc(),
      count: taskCountFunc(),
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
    let myObj = {
      title: addTitle.value,
      text: addTxt.value,
      impStatus: false,
      index: indexFunc(),
      count: impTaskCountFunc(),
    };

    taskObj.push(myObj);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    addTitle.value = "";
    addTxt.value = "";
    showTasks();
  }
});

let indexCount = 0;
function indexFunc(){
  let j = indexCount++;
  return j;
}

let imptaskCount = 0;
function impTaskCountFunc(){
  let n = imptaskCount++;
  return n;

}

let taskCount = 0;
function taskCountFunc(){
  let m = taskCount++;
  return m;
}

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
      <div id="${index + 1}" class="taskCard my-2 mx-2 card" style="width: 18rem;">
      <div class="card-body">
      <h5 id="${index + 3}" class="card-title">Note ${element.count + 1}: ${element.title}</h5>
      <p id="${index+ 5}" class="card-text"> ${element.text}</p>
      <button id="${index + 7}" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
      <button id="done${index + 9}" onclick="doneTask(this.id)"  class="btn btn-success">Done</button>
      <button id="${index + 11}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
      </div>
      </div>`;
    } 
    else {      
      impTskHtml += `
      <div id="${index + 1}" class="taskCard my-2 mx-2 card" style="width: 18rem; background-color: #f0b7a4;">
      <div class="card-body">
      <h5 id="title${index + 3}" class="card-title" style="color: #41484b;">Note ${element.count + 1}: ${element.title}</h5>
              <p id="content${index + 5}" class="card-text"> ${element.text}</p>
              <button id="edit${index + 7}" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
              <button id="done${index + 9}" onclick="doneTask(this.id)"  class="btn btn-success">Done</button>        
              <button id="delete${index + 11}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
              </div>
              </div>`;
    }
    impTaskFunc(impTskHtml);
    taskFunc(tskHtml);
  });
}

function impTaskFunc(params) {
  let impTaskDiv = document.getElementById("impTaskDiv");
  // impTaskDiv.style.display = "flex";

  if (params.length != 0) {
    impTaskDiv.innerHTML = params;
  } else {
    impTaskDiv.innerHTML = `Nothing to show! Use "Add a Task" section above to add tasks.`;
  }
}

function taskFunc(params) {
  let allTasksDiv = document.getElementById("allTasksDiv");
  // allTasksDiv.style.display = "flex";

  if (params.length != 0) {
    allTasksDiv.innerHTML = params;
  } else {
    allTasksDiv.innerHTML = `Nothing to show! Use "Add a Task" section above to add tasks.`;
  }
}


//EDIT TASK
function editTask(params) {
  console.log(`hello, im editing ${params}`);
  let editInt = parseInt(params);
  let divEditIndex = editInt - 6;
  
  // let original
  // let originalContent = 
  // console.log(`${divEditIndex}`);
  


  // editFunc(divEditIndex);
}

// function editDoneTask(params) {
//   console.log(`hello, im editing ${params}`);
//   let editDoneInt = parseInt(params);
//   let divDoneEditIndex = editDoneInt - 8;
//   editFunc(divDoneEditIndex);
// }

// function editFunc(params) {
//   document.getElementById(params).contentEditable = true;
// }


//UNDO TASK
function undoTask(params) {
  let divUndoTaskElem = document.getElementById(params).parentElement.parentElement
  console.log(divUndoTaskElem);
  let divUndoTempIndex = divUndoTaskElem.getAttribute('id');
  let divUndoTempIndexInt = parseInt(divUndoTempIndex);
  let divUndoIndex = divUndoTempIndexInt - 2;

  let doneTasks = localStorage.getItem("doneTasks");
  console.log(typeof doneTasks);
    
  if (doneTasks == null) 
  {
    doneTaskObj = [];   
  }  
  else {
    doneTaskObj = JSON.parse(doneTasks);   
  }
  let undoTask = doneTaskObj.splice(divUndoIndex, 1)[0];
  localStorage.setItem("doneTasks", JSON.stringify(doneTaskObj));
  console.log(undoTask);

  let pushIndex = undoTask.index;
  console.log(`${pushIndex}`);
  console.log(typeof pushIndex);

  let tasks = localStorage.getItem("tasks");
  if (tasks == null)
  {
    taskObj = [];
  }
  else {
    taskObj = JSON.parse(tasks);
  }

  taskObj.splice(pushIndex, 0 , undoTask);
  localStorage.setItem("tasks", JSON.stringify(taskObj));
  showTasks();
  showDone();
}


//DONE TASK
function doneTask(arg) {
  console.log(typeof arg);
  let divTaskElem = document.getElementById(arg).parentElement.parentElement
  console.log(divTaskElem);
  let divTaskIndex = divTaskElem.getAttribute('id');
  console.log(`${divTaskIndex}`);
  let divIndex = divTaskIndex - 1;
  console.log(`${divIndex}`);
  
  
  let tasks = localStorage.getItem("tasks");
  if (tasks == null)
  {
    taskObj = [];
  }
  else {
    taskObj = JSON.parse(tasks);
  } 

  let doneTasks = localStorage.getItem("doneTasks");
  // console.log(typeof doneTasks);
    
  if (doneTasks == null) 
  {
    doneTaskObj = [];   
  }  
  else {
    doneTaskObj = JSON.parse(doneTasks);   
  }
  
  
  let task = taskObj.splice(divIndex, 1)[0];
  console.log(task);
  
  let doneObj = {
    title: task.title,
    text: task.text,
    impStatus: task.impStatus,
    index: task.index,
    count:task.count,
  };
  doneTaskObj.push(doneObj);
  localStorage.setItem("doneTasks", JSON.stringify(doneTaskObj));
  localStorage.setItem("tasks", JSON.stringify(taskObj));
  showTasks();
  showDone();
}

function showDone() {
  let doneTasks = localStorage.getItem("doneTasks");
  if (doneTasks == null) {
    doneTaskObj = [];
  } 
  else {
    doneTaskObj = JSON.parse(doneTasks);
  }
  dtkHtml = "";
  doneTaskObj.forEach((element, index)=> {
    dtkHtml += `
    <div id="${index + 2}" class="taskCard my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
    <h5 id="${index + 4}" class="card-title doneClass">Note ${element.count + 1}: ${element.title}</h5>
    <p id="${index + 6}" class="card-text doneClass"> ${element.text}</p>
    <button id="${index + 8}" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
    <button id="undo${index + 10}" onclick="undoTask(this.id)"  class="btn btn-success">Undo</button>
    <button id="${index + 12}" onclick="deleteDoneTask(this.id)" class="btn btn-danger">Delete</button>
    </div>
    </div>`;
    doneTaskFunc(dtkHtml);
  });
}

function doneTaskFunc(params) {
  let doneTasksDiv = document.getElementById("doneTasksDiv");
  // doneTasksDiv.style.display = "flex";

  if (params.length != 0) {
    doneTasksDiv.innerHTML = params;
  } else {
    doneTasksDiv.innerHTML = `Nothing to show! Complete some task.`;
  }
}



//DELETE TASK
function deleteTask(params) {
  // let intParams = parseInt(params);
  // let index = intParams-11;
  let divDeleteTaskElem = document.getElementById(params).parentElement.parentElement;
  let divDeleteIndex = parseInt(divDeleteTaskElem.getAttribute('id'));
  deleteIndex = divDeleteIndex - 1;

  let tasks = localStorage.getItem("tasks");
  if (tasks == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(tasks);
  }

  taskObj.splice(deleteIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(taskObj));
  showDone();
  showTasks();
}

function deleteDoneTask(params) {
  // let intParams = parseInt(params);
  // let index = intParams-12;
  let divDeleteDoneTaskElem = document.getElementById(params).parentElement.parentElement;
  let divDeleteDoneIndex = parseInt(divDeleteDoneTaskElem.getAttribute('id'));
  deleteDoneIndex = divDeleteDoneIndex - 2;
  let doneTasks = localStorage.getItem("doneTasks");
  if (doneTasks == null) {
    doneTaskObj = [];
  } 
  else {
    doneTaskObj = JSON.parse(doneTasks);
  }    
  doneTaskObj.splice(deleteDoneIndex, 1);
  localStorage.setItem("doneTasks", JSON.stringify(doneTaskObj));
  showDone();
  showTasks();
}


//SEARCH TASK
let search = document.getElementById('searchTask');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let taskCard = document.getElementsByClassName('taskCard');
    // console.log(Array.from(taskCard));
    // console.log(taskCard);
    Array.from(taskCard).forEach((elem)=>{
        // console.log(elem.getElementsByTagName("h5"))
        // console.log(elem.getElementsByTagName("h5")[0])
    
        let cardTitle = elem.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardTxt = elem.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            elem.style.display = "block";
        }
        else if(cardTitle.includes(inputVal)){
            elem.style.display = "block";
        }
        else{
            elem.style.display = "none";
        }
    })
})
