let tasks = [];
let time = 0;
let timer = null;
let timeBreaker = null;
let current = null;
let setMinutes = 25;
let setBreakMinutes = 5;

const form = document.querySelector('.form');
const inputTask = document.querySelector('.inputTask');
const addTask = document.querySelector('.buttonTask');
const taskName = document.querySelector('.time .taskName');
const timeDiv = document.querySelector(".time .value");
const buttonStop = document.querySelector(".stop");
const tasksContainer = document.querySelector(".tasksContainer");
const buttonReset = document.querySelector(".reset");
const getMinutes = document.querySelector(".minutes");
const getBreakMinutes = document.querySelector(".break");
const skin = document.querySelector(".skin");
const background = getComputedStyle(document.body).getPropertyValue("--background");

//colorsssss changeeee

skin.addEventListener("click", () => {
    randomHexColor();
    document.body.style.setProperty("--background", "linear-gradient(to right, " + randomHexColor() + ", " + randomHexColor() + ")");
    localStorage.setItem("color", document.body.style.getPropertyValue("--background"));
});


window.addEventListener("load", () => {
    document.body.style.setProperty("--background", localStorage.getItem("color"));
});

const randomInteger = (max) => {
    return Math.floor(Math.random() * (max * 1));
};

const randomRgbColor = () => {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r,g,b];
};

const randomHexColor = () => {
    let [r,g,b] =randomRgbColor();
    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');

    return "#" + hr + hg + hb;
}                                                         //endColors


//inputs for minutes and breaks/////////////////////
getMinutes.addEventListener("input", (e) => {
    if(e.target.value > 0 && e.target.value < 60){
        setMinutes = e.target.value;
    }else{
        setMinutes = 1;
    }
})

getBreakMinutes.addEventListener("input", (e) => {
    if(e.target.value > 0 && e.target.value < 60){
        setBreakMinutes = e.target.value;
    }else{
        setBreakMinutes = 1;
    }
});
/////////////////////////////////////////////////////

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(inputTask.value != ""){
        createTask(inputTask.value);
        inputTask.value = "";
        render();
    }
});

const createTask = (value) => {
    const newTask = {
        id:(Math.random() * 100).toString(36).slice(2),
        title: value,
        done: false,
    };
    tasks.unshift(newTask);
}

const render = () => {
    const createHtml = tasks.map((task) => {
        return `
        <div class="task">
            <div class="completed">${task.done ? `<span class="done">Done</span>`:`<button class=startButton data-id="${task.id}">Start</button>`}</div>
            <div class="title">${task.title}</div>
            <div class="infoTask">Min: ${setMinutes}|Break: ${setBreakMinutes}</div>
            </div>`;
        })

    tasksContainer.innerHTML = createHtml.join("");
    console.log(createHtml);

    const startButtons = document.querySelectorAll(".task .startButton");
    startButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            if(!timer){
                const id = button.getAttribute("data-id");
                startButtonHandler(id);
                button.textContent = "In progress...";
            }
        })
    });
}

const renderStop = () => {
    const startButtons = document.querySelectorAll(".task .startButton");
    startButtons.forEach((button) => {
        buttonStop.addEventListener("click", (e) => {
            if(button.textContent === "In progress..."){
                button.textContent = "Start";
            }
        })
    });
}
render();

//para el tiempo de la tarea

const startButtonHandler = (id) => {
    time = setMinutes * 60;
    current = id;
    const taskIndex = tasks.findIndex((task) => task.id === id);
    taskName.textContent = tasks[taskIndex].tittle;
    renderTimer();
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
}
//add top button
const timeHandler = (id) =>{
    time--;
    renderTimer();
    if(time === 0){
        clearInterval(timer);
        //current = null;  taskName.textContent = "";
        completed(id);
        timer = null;
        render();
        startBreak();
    }
    //buttonStop

    buttonStop.addEventListener("click", () => {
        renderStop();
        clearInterval(timer);
        current = null;
        timeDiv.textContent = "00:00";
        timer = null;
    });
}

const renderTimer = () => {
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);
    timeDiv.textContent = `${minutes < 10? "0": "" }${minutes}:${seconds < 10? "0": ""}${seconds}`;
}

renderTimer();


const completed = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].done = true;
}

//break  para el tiempo de  descanso

const startBreak = () => {
    time = setBreakMinutes * 60;
    taskName.textContent = "Break";
    renderTimer();
    timerBreak = setInterval(() => {
        timeHandlerBreak();
    }, 1000);
}

const timeHandlerBreak = () => {
    time--;
    renderTimer();
    if(time === 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        taskName.textContent = "";/* 
        render(); */
    }

    buttonStop.addEventListener("click", () => {
        clearInterval(timerBreak);
        current = null;
        timeDiv.textContent = "00:00";
        taskName.textContent = "";
        timerBreak = null;
    });
}

//reset 
buttonReset.addEventListener('click', () => {
    tasks.length = 0;
    render();
});









window.odometerOptions = {
    format: '(ddd).dd'
};



window.odometerOptions = {
    auto: false, // Don't automatically initialize everything with class 'odometer'
    selector: '.my-numbers', // Change the selector used to automatically find things to be animated
    format: '(,ddd).dd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
    duration: 3000, // Change how long the javascript expects the CSS animation to take
    theme: 'car', // Specify the theme (if you have more than one theme css file on the page)
    animation: 'count' // Count is a simpler animation method which just increments the value,
    // use it when you're looking for something more subtle.
};

