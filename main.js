// 1. ADDING TO-DOS

let toDos = localStorage.getItem("toDos") || "[]"
toDos = JSON.parse(toDos)

const toDoList = document.querySelector(".toDoList")
const task = document.querySelector(".task")

renderToDos()

const form = document.querySelector(".toDoForm")
form.addEventListener("submit", addToDo)

const toDoInput = document.querySelector("#inputBox")

function addToDo(event) {
    event.preventDefault()
    let toDo = toDoInput.value
    if (toDo) {
        toDos.push(toDo)
        storeToDos()
        renderToDos()
    }
    toDoInput.value = ""
}

function storeToDos() {
    window.localStorage.setItem("toDos", JSON.stringify(toDos))
}

function renderToDos() {
    toDoList.innerHTML = ""

    for (let i = 0; i < toDos.length; i++) {
        renderToDo(toDos[i])
    }
    document.querySelector(".toDoCount").innerText = toDos.length
}

function renderToDo(toDo) {
    let li = document.createElement("li")
    li.classList.add("toDoItem")
    li.innerText = toDo
    toDoList.appendChild(li)

    li.addEventListener("click", function () {
        completeToDo(toDo)
        task.classList.add("wellDone")
        setTimeout(removeCrackers,1000)
    })
}

function removeCrackers() {
    task.classList.remove("wellDone")
}


// 2. COMPLETE TO-DOS

let completedToDos = localStorage.getItem("completedToDos") || "[]"
completedToDos = JSON.parse(completedToDos)
const completedToDoList = document.querySelector(".completedList")
renderCompletedToDos()

function completeToDo(toDoss) {
    completedToDos.push(toDoss)

    toDos = toDos.filter(t => t !== toDoss)

    storeToDos()
    storeCompletedToDos()
    renderToDos()
    renderCompletedToDos()
}

function storeCompletedToDos() {
    window.localStorage.setItem("completedToDos", JSON.stringify(completedToDos))
}

function renderCompletedToDos() {
    completedToDoList.innerHTML = ""
    for (completedToDo of completedToDos) {
        renderCompleted(completedToDo)
    }

    document.querySelector(".completedToDoCount").innerText = completedToDos.length
}

function renderCompleted(completed) {
    let li = document.createElement("li")
    li.classList.add("doneItem")
    li.innerText = completed
    completedToDoList.appendChild(li)
    li.addEventListener("click", function () {
        deleting(completed)
    })
}

function deleting(comp) {
    completedToDos = completedToDos.filter(t => t !== comp)
    console.log(completedToDos)
    storeCompletedToDos()
    renderCompletedToDos()
}


const title = document.querySelector('.title');
  const text = title.querySelector('h1');
  const walk = 50;

  function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = title;
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
      x = x + e.target.offsetLeft;
      y = y + e.target.offsetTop;
    }

    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    text.style.textShadow = `${xWalk}px ${yWalk}px 0 pink`;

  }

  title.addEventListener('mousemove', shadow);

//       ${xWalk}px ${yWalk}px 0 pink,
//       ${xWalk * -1}px ${yWalk}px 0 lightblue,
//       ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
//       ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)