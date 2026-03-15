let listTask = [];
let valueInput = document.getElementById("taskInput");
let btnAdd = document.getElementById("addBtn");
let content = document.getElementById("taskList");
let completedCount = document.getElementById("completedCount");
let totalCount = document.getElementById("totalCount");
let completionStatus = document.getElementById("completionStatus");
btnAdd.addEventListener("click", createTask);
function createTask() {
    let getValueInput = valueInput.value.trim();
    if (getValueInput === "") {
        alert("Vui lòng nhập tên công việc");
        return;
    }
    let task = {
        id: Date.now(),
        name: getValueInput,
        status: false
    };
    listTask.push(task);
    valueInput.value = "";
    valueInput.focus();
    render();
}
function render() {
    content.innerHTML = "";
    if (listTask.length === 0) {
        content.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <div class="empty-state-text">
                Chưa có công việc nào. Hãy thêm công việc mới!
            </div>
        </div>
        `;
        updateCounter();
        return;
    }
    listTask.forEach((task) => {
        let newTaskItem = document.createElement("div");
        newTaskItem.className = "task-item";
        if (task.status) newTaskItem.classList.add("completed");
        newTaskItem.innerHTML = `
        <input type="checkbox"
        class="task-checkbox"
        ${task.status ? "checked" : ""}
        onclick="toggleStatus(${task.id})">
        <p class="task-text ${task.status ? "completed" : ""}">${task.name}</p>
        <input class="task-edit-input" style="display:none" value="${task.name}">
        <div class="task-actions">
            <button class="btn-edit" onclick="editTask(this,${task.id})">✏️ Sửa</button>
            <button class="btn-delete" onclick="deleteTask(${task.id})">🗑️ Xóa</button>
        </div>
        `;
        content.appendChild(newTaskItem);
    });
    updateCounter();
}
function toggleStatus(id) {
    let task = listTask.find(t => t.id === id);
    task.status = !task.status;
    render();
}
function deleteTask(id) {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    listTask = listTask.filter(task => task.id !== id);
    render();
}
function editTask(btn,id){
    let taskItem = btn.closest(".task-item");
    let text = taskItem.querySelector(".task-text");
    let input = taskItem.querySelector(".task-edit-input");
    let actions = taskItem.querySelector(".task-actions");
    text.style.display = "none";
    input.style.display = "block";
    actions.innerHTML = `
        <button class="btn-save" onclick="saveTask(${id})">💾 Lưu</button>
        <button class="btn-cancel" onclick="render()">❌ Hủy</button>
    `;
}
function saveTask(id){
    let taskItem = document.querySelector(`[onclick="saveTask(${id})"]`).closest(".task-item");
    let input = taskItem.querySelector(".task-edit-input");
    let newValue = input.value.trim();
    if(newValue === ""){
        alert("Tên công việc không được để trống");
        return;
    }
    let task = listTask.find(t => t.id === id);
    task.name = newValue;
    render();
}
function updateCounter(){
    let total = listTask.length;
    let completed = listTask.filter(t => t.status).length;
    totalCount.textContent = total;
    completedCount.textContent = completed;
    if(total > 0 && total === completed){
        completionStatus.innerHTML = `
        <div class="completion-badge">
            <span class="check-icon">✅</span>
            <span>Hoàn thành tất cả!</span>
        </div>
        `;
    }else{
        completionStatus.innerHTML = "";
    }
}
document.addEventListener("DOMContentLoaded", render);