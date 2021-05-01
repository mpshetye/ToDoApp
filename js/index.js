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
  taskObj.forEach((element, index)=> {
    if (element.impStatus == false) {
      tskHtml += `
      <div id="${index + 1}" class="taskCard tasks my-2 mx-2 card" style="width: 18rem;">
      <div class="card-body">
      <h5 id="title${index + 3}" class="card-title">Note ${element.count + 1}: <span>${element.title}</span></h5>
      <p id="content${index+ 5}" class="card-text"> ${element.text}</p>
      <button id="edit${index + 7}" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
      <button id="done${index + 9}" onclick="doneTask(this.id)"  class="btn btn-success">Done</button>
      <button id="delete${index + 11}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
      </div>
      </div>`;
    } 
    else {      
      impTskHtml += `
      <div id="${index + 1}" class="taskCard tasks my-2 mx-2 card" style="width: 18rem; background-color: #f0b7a4;">
      <div class="card-body">
      <h5 id="title${index + 3}" class="card-title" style="color: #41484b;">Note ${element.count + 1}: <span>${element.title}</span></h5>
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
  let divEditParentElem = document.getElementById(params).parentElement.parentElement;
  let divEditParentIndex = parseInt(divEditParentElem.getAttribute('id'));
  // console.log(typeof divEditParentIndex);
  let divEditElem = document.getElementById(params).parentElement;
  let divEditIndex = divEditElem.getAttribute('id');
  let taskHeader = divEditElem.getElementsByTagName("h5")[0];
  let taskTitle = taskHeader.children[0];
  let originalTitle = taskHeader.children[0].innerText;
  let taskContent = divEditElem.getElementsByTagName("p")[0];
  let originalContent = divEditElem.getElementsByTagName("p")[0].innerText;
  let buttons = divEditElem.getElementsByTagName("button");
  // let buttons = divEditElem.children;
  console.log(buttons);
  let editBtn = divEditElem.getElementsByTagName("button")[0];
  // let undoEditBtn = divEditElem.getElementsByTagName("button")[1];
  // let saveEditBtn = divEditElem.getElementsByTagName("button")[2];
  let doneBtn = divEditElem.getElementsByTagName("button")[1];
  let deleteBtn = divEditElem.getElementsByTagName("button")[2];
  
  let undoEditBtn = document.createElement("button");
  undoEditBtn.id = 'undoEditTask';
  undoEditBtn.classList = 'btn btn-success';
  undoEditBtn.innerText = 'Undo';
  undoEditBtn.onclick = function(){
    console.log(`hello, im undo edit button`);    
    console.log(originalTitle);    
    console.log(originalContent);
    let currentTitle = divEditElem.getElementsByTagName("h5")[0].children[0].innerText;
    let currentContent = divEditElem.getElementsByTagName("p")[0].innerText;
    console.log(currentTitle);
    console.log(currentContent);
    if(originalTitle != currentTitle){
      taskTitle.innerText = originalTitle;
    }
    
    else if(originalContent != currentContent){
      taskContent.innerText = originalContent;
    }
    
  }
  
  
  let saveEditBtn = document.createElement("button");
  saveEditBtn.id = 'saveEditTask';
  saveEditBtn.classList = 'btn btn-info';
  saveEditBtn.innerText = 'Save';
  saveEditBtn.style.cssText = 'margin-left: .5rem;';
  saveEditBtn.onclick = function(){
    console.log(`hello, im save edit button`);
    taskTitle.contentEditable = false;
    taskContent.contentEditable = false;
    // let buttonsm = divEditElem.getElementsByTagName("button");
    // console.log(buttonsm);
    divEditElem.removeChild(document.getElementById('undoEditTask'));
    divEditElem.removeChild(document.getElementById('saveEditTask'));
    editBtn.style.display = "inline-block";
    doneBtn.style.display = "inline-block";
    deleteBtn.style.display = "inline-block";
    if(divEditParentElem.classList.contains('tasks')){
      let tasks = localStorage.getItem("tasks");
      if (tasks == null) {
        taskObj = [];
      } 
      else {
        taskObj = JSON.parse(tasks);
      }
      let taskIndex = divEditParentIndex - 1;
      let changedTask = taskObj.splice(taskIndex, 1)[0];
      console.log(changedTask);
      changedTask.title = taskTitle.innerText;
      changedTask.text = taskContent.innerText;
      let changedTaskIndex = changedTask.index;
      taskObj.splice(changedTaskIndex, 0, changedTask);
      localStorage.setItem("tasks", JSON.stringify(taskObj));
    }
    else if(divEditParentElem.classList.contains('completedTasks')){
      let doneTasks = localStorage.getItem("doneTasks");
      if (doneTasks == null) 
      {
        doneTaskObj = [];   
      }  
      else {
        doneTaskObj = JSON.parse(doneTasks);   
      }
      let completedTaskIndex = divEditParentIndex - 2;
      let changedDoneTask = doneTaskObj.splice(completedTaskIndex, 1)[0];
      console.log(changedDoneTask);
      changedDoneTask.title = taskTitle.innerText;
      changedDoneTask.text = taskContent.innerText;
      let changedDoneTaskIndex = changedDoneTask.index;
      doneTaskObj.splice(changedDoneTaskIndex, 0, changedDoneTask);
      localStorage.setItem("doneTasks", JSON.stringify(doneTaskObj));
    }
    
  }

  taskTitle.contentEditable = false;
  taskContent.contentEditable = false;
  if ((taskTitle.contentEditable == "false") && (taskTitle.contentEditable == "false")) {
    taskTitle.contentEditable = true;
    taskContent.contentEditable = true;
    editBtn.style.display = "none";
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
    taskContent.after(undoEditBtn);
    undoEditBtn.after(saveEditBtn);
  }
}


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
    <div id="${index + 2}" class="taskCard completedTasks my-2 mx-2 card" style="width: 18rem;">
    <div class="card-body">
    <h5 id="doneTitle${index + 4}" class="card-title doneClass">Note ${element.count + 1}: <span>${element.title}</span></h5>
    <p id="doneContent${index + 6}" class="card-text doneClass"> ${element.text}</p>
    <button id="doneEdit${index + 8}" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
    <button id="undo${index + 10}" onclick="undoTask(this.id)"  class="btn btn-success">Undo</button>
    <button id="doneDelete${index + 12}" onclick="deleteDoneTask(this.id)" class="btn btn-danger">Delete</button>
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
    console.log(Array.from(taskCard));
    console.log(taskCard);
    Array.from(taskCard).forEach((elem)=>{
        console.log(elem.getElementsByTagName("h5"))
        console.log(elem.getElementsByTagName("h5")[0])
    
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
