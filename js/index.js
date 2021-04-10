showTasks();
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',(e)=>{
    const addTxt = document.getElementById('addTxt');
    const addTitle = document.getElementById('addTitle');
    const messageCheckbox = document.getElementById('messageCheckbox');

    let tasks = localStorage.getItem('tasks');
    let impTasks = localStorage.getItem('impTasks');

    if(messageCheckbox.checked){
        if(impTasks == null){
            impTasksObj = [];
        }
        else{
            impTasksObj = JSON.parse(impTasks);
        }
        
        let myObj ={
            title:addTitle.value,
            text:addTxt.value
        };

        impTasksObj.push(myObj);
        localStorage.setItem("impTasks", JSON.stringify(impTasksObj));
        addTitle.value = "";
        addTxt.value = "";
        showTasks();
    }
    else{
        if(tasks == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(tasks);
        }


        let myObj ={
            title:addTitle.value,
            text:addTxt.value
        };

        taskObj.push(myObj);
        localStorage.setItem("tasks", JSON.stringify(taskObj));
        addTitle.value = "";
        addTxt.value = "";
        showTasks();
        
    }
});

function showTasks(){
    let impTasks = localStorage.getItem('impTasks');
    if (impTasks == null) {
        impTasksObj = [];
    } else {
        impTasksObj = JSON.parse(impTasks);
    }
    let html='';
    impTasksObj.forEach(function(element, index) {
        html +=`
        <div id="${index}" class="taskCard imp my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 id="titleID" class="card-title">Note ${index + 1}: ${element.title}</h5>
                    <p id="textID" class="card-text"> ${element.text}</p>
                    <button id="${index + 1}" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
                    <button id="${index + 2}" onclick="doneTask(this.id)"  class="btn btn-success">Done</button>
                    <button id="${index + 3}" onclick="undoTask(this.id)"  class="btn btn-success" style="display:none;">Undo</button>
                    <button id="${index + 4}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
                </div>
            </div>`;     
    });

    let impTaskH = document.getElementById('impTaskH');
    let impTaskDiv = document.createElement('div');
    impTaskDiv.classList.add("row");
    if (impTasksObj.length != 0)
    {
        impTaskH.after(impTaskDiv);
        impTaskDiv.innerHTML = html;
    }
    else {
        impTaskH.after(`Nothing to show! Use "Add a Task" section above to add tasks.`);
    }


    let tasks = localStorage.getItem('tasks');
    if (tasks == null) {
        taskObj = [];
    } else {
        taskObj = JSON.parse(tasks);
    }
    html='';
    taskObj.forEach(function(element, index) {
        html +=`
        <div id="${index + 1}" class="taskCard task my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 id="titleID" class="card-title">Note ${index + 1}: ${element.title}</h5>
                    <p id="textID" class="card-text"> ${element.text}</p>
                    <button id="${index + 5}" onclick="editTask(this.id)" class="btn btn-primary">Edit</button>
                    <button id="${index + 6}" onclick="doneTask(this.id)"  class="btn btn-success">Done</button>
                    <button id="${index + 7}" onclick="undoTask(this.id)"  class="btn btn-success" style="display:none;">Undo</button>
                    <button id="${index + 8}" onclick="deleteTask(this.id)" class="btn btn-danger">Delete</button>
                </div>
            </div>`;       
    });
    let allTasksH = document.getElementById('allTasksH');
    let allTasksDiv = document.createElement('div');
    allTasksDiv.classList.add("row");
    if (taskObj.length != 0)
    {
        allTasksH.after(allTasksDiv);
        allTasksDiv.innerHTML = html;
    }
    else {
        allTasksH.after(`Nothing to show! Use "Add a Task" section above to add tasks.`);
      }
    
}

function editTask(params){
    console.log(`hello, im editing ${params}`);
        
}


function doneTask(arg) {
    let titleID = document.getElementById('titleID');
    titleID.classList.add("doneClass");
    let textID = document.getElementById('textID');
    textID.classList.add("doneClass");
    // let index = arg - 2;
    // let divCardElem = document.getElementById(index);
   
   if(titleID.classList.contains("doneClass") && textID.classList.contains("doneClass")){

       document.getElementById('doneTasksH').after(divCardElem);
       document.getElementById('')
       undoBtn.addEventListener('click', ()=>{
           titleID.classList.remove("doneClass");
           textID.classList.remove("doneClass");
               if(divCardElem.classList.contains("imp")){
   
               document.getElementById('impTaskH').after(divCardElem);
           }
           
           else{
               document.getElementById('allTasksH').after(divCardElem);
   
           }
       });

   }
        
}

function deleteTask(params){
    console.log(`hello, im deleting ${params}`);
        
}