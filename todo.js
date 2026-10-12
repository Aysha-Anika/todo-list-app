// ===============================
// 1. HTML Elements Select
// ===============================

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const clearBtn = document.querySelector("#clearBtn");
const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const completedBtn = document.querySelector("#completedBtn");
// Search input select করছি
const searchInput = document.querySelector("#searchInput");

// ===============================
// 2. Local Storage থেকে Tasks নেওয়া
// ===============================

// আগে কোনো task save করা থাকলে সেটা নেওয়া হচ্ছে
// না থাকলে empty array [] ব্যবহার হবে

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// বর্তমানে কোন filter চলছে
let currentFilter = "all";

// ===============================
// 3. Tasks Display করার Function
// ===============================

function displayTasks() {

    // পুরোনো list clear করছি
    taskList.innerHTML = "";


    // Search box-এ যা লেখা আছে তা নিচ্ছি
const searchText = searchInput.value.toLowerCase().trim();


    // সব task-এর জন্য loop চালাচ্ছি
    tasks.forEach(function (task, index) {

        // Active filter হলে completed task skip হবে
        if (currentFilter === "active" && task.completed) {
            return;
        }

        // Completed filter হলে incomplete task skip হবে
        if (currentFilter === "completed" && !task.completed) {
            return;
        }
        // Task-এর নামের সঙ্গে search মিলিয়ে দেখছি
if (!task.text.toLowerCase().includes(searchText)) {
    return;
}
        // নতুন <li> তৈরি করছি
        const li = document.createElement("li");


        // ===============================
        // Task Text
        // ===============================

        const taskTextSpan = document.createElement("span");

        taskTextSpan.textContent = task.text;


        // যদি task completed হয়
        if (task.completed) {
            li.classList.add("completed");
        }


        // ===============================
        // Complete Button
        // ===============================

        const completeBtn = document.createElement("button");

        completeBtn.textContent = "Complete";

        completeBtn.addEventListener("click", function () {

            // completed true হলে false হবে
            // false হলে true হবে
            task.completed = !task.completed;

            // নতুন অবস্থাটা save করছি
            saveTasks();

            // আবার list দেখাচ্ছি
            displayTasks();

        });


        // ===============================
        // Edit Button
        // ===============================

        const editBtn = document.createElement("button");

        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function () {

            const newTask = prompt(
                "Edit your task:",
                task.text
            );

            // User কিছু লিখলে update হবে
            if (newTask !== null && newTask.trim() !== "") {

                task.text = newTask.trim();

                saveTasks();

                displayTasks();
            }

        });


        // ===============================
        // Delete Button
        // ===============================

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {

            // নির্দিষ্ট task array থেকে remove করছি
            tasks.splice(index, 1);

            // নতুন list save করছি
            saveTasks();

            // আবার display করছি
            displayTasks();

        });


        // ===============================
        // সবকিছু <li>-তে যোগ
        // ===============================

        li.appendChild(taskTextSpan);

        li.appendChild(completeBtn);

        li.appendChild(editBtn);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    taskCount.textContent = `Total Tasks: ${tasks.length}`;


}


// ===============================
// 4. Local Storage Save Function
// ===============================

function saveTasks() {

    // tasks array-কে JSON text বানিয়ে save করছি
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// ===============================
// 5. Add Task
// ===============================

addBtn.addEventListener("click", function () {

    // Input থেকে task নিচ্ছি
    const taskText = taskInput.value.trim();


    // Input খালি হলে
    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    // নতুন task object তৈরি করছি
    const newTask = {

        text: taskText,

        completed: false

    };


    // নতুন task array-তে যোগ করছি
    tasks.push(newTask);


    // Local Storage-এ save করছি
    saveTasks();


    // নতুন task display করছি
    displayTasks();


    // Input clear করছি
    taskInput.value = "";

});


// ===============================
// 6. Page Load হলে Tasks দেখানো
// ===============================

// Browser refresh হলেও saved tasks
// আবার screen-এ দেখাবে

displayTasks();

// ===============================
// 7. Enter Key দিয়ে Task Add
// ===============================

taskInput.addEventListener("keydown", function (event) {

    // Keyboard থেকে Enter চাপা হয়েছে কিনা check করছি
    if (event.key === "Enter") {

        // Add button-এর click event চালাচ্ছি
        addBtn.click();

    }

});

// ===============================
// 8. Clear All Tasks
// ===============================

clearBtn.addEventListener("click", function () {

    // কোনো task না থাকলে কিছু করার দরকার নেই
    if (tasks.length === 0) {
        alert("No tasks to clear.");
        return;
    }

    // সব task মুছে ফেলছি
    tasks = [];

    // Local Storage update করছি
    saveTasks();

    // Screen থেকে task সরাচ্ছি
    displayTasks();

});

// ===============================
// 9. Task Filter
// ===============================


// All Button
allBtn.addEventListener("click", function () {

    // সব task দেখাবে
    currentFilter = "all";

    displayTasks();

});


// Active Button
activeBtn.addEventListener("click", function () {

    // শুধু incomplete task দেখাবে
    currentFilter = "active";

    displayTasks();

});

// ===============================
// 9. Task Filter
// ===============================


// All Button
allBtn.addEventListener("click", function () {

    // সব task দেখাবে
    currentFilter = "all";

    displayTasks();

});


// Active Button
activeBtn.addEventListener("click", function () {

    // শুধু incomplete task দেখাবে
    currentFilter = "active";

    displayTasks();

});


// ===============================
// 9. Task Filter
// ===============================


// All Button
allBtn.addEventListener("click", function () {

    // সব task দেখাবে
    currentFilter = "all";

    displayTasks();

});


// Active Button
activeBtn.addEventListener("click", function () {

    // শুধু incomplete task দেখাবে
    currentFilter = "active";

    displayTasks();

});


// ===============================
// 9. Task Filter
// ===============================


// All Button
allBtn.addEventListener("click", function () {

    // সব task দেখাবে
    currentFilter = "all";

    displayTasks();

});


// Active Button
activeBtn.addEventListener("click", function () {

    // শুধু incomplete task দেখাবে
    currentFilter = "active";

    displayTasks();

});

// ===============================
// 9. Task Filter
// ===============================

// All Button
allBtn.addEventListener("click", function () {

    // সব task দেখাবে
    currentFilter = "all";

    displayTasks();

});
// Active Button
activeBtn.addEventListener("click", function () {

    // শুধু incomplete task দেখাবে
    currentFilter = "active";

    displayTasks();

});
// Active Button
activeBtn.addEventListener("click", function () {

    // শুধু incomplete task দেখাবে
    currentFilter = "active";

    displayTasks();

});
// Completed Button
completedBtn.addEventListener("click", function () {

    // শুধু completed task দেখাবে
    currentFilter = "completed";

    displayTasks();

});

// Search box-এ লেখা পরিবর্তন হলে
// task list আবার দেখাব
searchInput.addEventListener("input", function () {
    displayTasks();
});


