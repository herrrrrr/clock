// greeting.js에 있는 상수와 충돌하기 때문에 이름을 바꿔준다.
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

// function filterFn(toDo) {
//     return toDo.id === 1;
// }

let toDos = [];   // 할 일을 저장할 배열 생성

function deleteToDo(event) {
    // console.dir(event.target);
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // const cleanToDos = toDos.filter(filterFn);   // filterFn이 체크된 아이템들의 array를 주는 것
    const cleanToDos = toDos.filter(function(toDo) {
        // console.log(toDo.id, li.id);      // toDo.id는 숫자, li.id는 string
        return toDo.id !== parseInt(li.id);     // 모든 li에는 id가 있음
    });
    // console.log(cleanToDos);
    // X버튼을 누르면 cleanToDos는 1개 줄고 toDos는 그대로이다.
    // 이제 할 것은 toDos와 cleanToDos을 교체해주면 된다!!!
    toDos = cleanToDos;     // toDos가 const이기 때문에 let으로 바꿔준다.
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));  // JSON.stringify() : js object를 string으로 바꿔줌
}

function paintToDo(text) {


    // const test = ''; //    x135153135
    // const test = null; //    x135
    // const test = undefined; //    x135153

    
    // const test = '2'; //    x135153135
    // const test = '12312'; //    x234234234

    
    // const object = {        // x3453485034850345
    //     tset:[],            // x465468
    //     string: '',         // x98989
    // };

    // string.string = 'sdfsdf';   // xsd5f4sd6f4s

    // object_tmp = [...object, string: 'sdfsdf'];


    // const object_tmp = {        // xsdfsdfsdsdf
    //     tset:[],            // x465468
    //     string: '',         // x98989
    // };

    // object_tmp.string = 'sdfsdfds';



    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.style.textAlign = "left";
    li.style.listStyle = "none";
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);    // 할 일을 추가할 때 마다 배열에 저장
    saveToDos();    // push 이후에 호출
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

// function something(toDo) {
//     console.log(toDo.text);
// }

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
