//pengambilan elemen
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const tambahItem = document.getElementById("tambahItem");


const CHECK ="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";

let LIST,id;
let data = localStorage.getItem("TODO");
if (data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDo(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadToDo(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash);
    });
}

clear.addEventListener('click', function(){
    localStorage.clear();
    //location.reload();
    list.innerHTML='';
})

const options = {weekday:'long', month:'short', day:'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("id-ID",options);

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    //LIST[element.id] = null;
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target; //<i class="fa ${DONE} co" job="complete" id="${id}"></i>
    const elementJOB = event.target.attributes.job.value;
    if(elementJOB == "complete"){
        completeToDo(element);
    }
    else if(elementJOB == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


function addToDo(toDo,id,done,trash){
    if(trash){return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const text = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p> 
                    <i class="de fa fa-trash-o" job="delete" id="${id}"></i>
                  </li>`;

    const position = "beforeend";

    list.insertAdjacentHTML(position,text);
}


function inputList(){
    const toDo = input.value;
        if(toDo){
            addToDo(toDo,id,false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            localStorage.setItem("TODO", JSON.stringify(LIST));    
        id++;
        }
        input.value = "";
}

document.addEventListener("keyup",function(event) {
    if(event.keyCode==13){
        inputList(); 
    }
});

tambahItem.addEventListener("click",function(event){
    inputList();
});

//ganti background

const color1=document.getElementById("color1");
const color2=document.getElementById("color2");
const color3=document.getElementById("color3");

color1.addEventListener("click", function(event){
    document.body.style.backgroundColor = "rgb(204, 67, 67)";
});

color2.addEventListener("click", function(event){
    document.body.style.backgroundColor = "rgb(37, 204, 59)";
});

color3.addEventListener("click", function(event){
    document.body.style.backgroundColor = "rgb(89, 33, 219)";
});

/*Image Slide
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("header");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}*/
