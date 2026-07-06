// ===============================
// Student Record System
// Part 3A
// ===============================

// Get Elements
const studentForm = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const courseInput = document.getElementById("course");
const branchInput = document.getElementById("branch");
const semesterInput = document.getElementById("semester");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const addBtn = document.getElementById("addBtn");

// Store Students
let students = JSON.parse(localStorage.getItem("students")) || [];

// ===============================
// Save to Local Storage
// ===============================
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

// ===============================
// Generate Student ID
// ===============================
function generateId() {
    return Date.now();
}

// ===============================
// Display Students
// ===============================
function displayStudents() {

    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.course}</td>
                <td>${student.branch}</td>
                <td>${student.semester}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>

                <td>
                    <button class="edit-btn" onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button class="delete-btn" onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

// ===============================
// Validate Form
// ===============================
function validateForm() {

    if (
        nameInput.value.trim() === "" ||
        rollInput.value.trim() === "" ||
        courseInput.value.trim() === "" ||
        branchInput.value.trim() === "" ||
        semesterInput.value.trim() === "" ||
        emailInput.value.trim() === "" ||
        phoneInput.value.trim() === ""
    ) {

        alert("Please fill all fields.");
        return false;

    }

    return true;

}

// ===============================
// Add Student
// ===============================
addBtn.addEventListener("click", () => {

    if (!validateForm()) return;

    const student = {

        id: generateId(),

        name: nameInput.value.trim(),

        roll: rollInput.value.trim(),

        course: courseInput.value.trim(),

        branch: branchInput.value.trim(),

        semester: semesterInput.value.trim(),

        email: emailInput.value.trim(),

        phone: phoneInput.value.trim()

    };

    students.push(student);

    saveStudents();

    displayStudents();

    studentForm.reset();

    alert("Student Added Successfully!");

});

// ===============================
// Placeholder Functions
// (Will be completed in Part 3B)
// ===============================
function editStudent(id) {
    // Coming in Part 3B
}

function deleteStudent(id) {
    // Coming in Part 3B
}

// ===============================
// Load Students
// ===============================
displayStudents();
// ======================================
// Part 3B
// Edit, Update, Delete & Search
// ======================================

// Currently selected student
let editId = null;

// Update Button
const updateBtn = document.getElementById("updateBtn");

// Search Box
const searchInput = document.getElementById("search");

// ------------------------------
// Edit Student
// ------------------------------
function editStudent(id) {

    const student = students.find(s => s.id === id);

    if (!student) return;

    editId = id;

    nameInput.value = student.name;
    rollInput.value = student.roll;
    courseInput.value = student.course;
    branchInput.value = student.branch;
    semesterInput.value = student.semester;
    emailInput.value = student.email;
    phoneInput.value = student.phone;

    addBtn.disabled = true;
    updateBtn.disabled = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ------------------------------
// Update Student
// ------------------------------
updateBtn.addEventListener("click", () => {

    if (editId === null) {
        alert("Please select a student first.");
        return;
    }

    if (!validateForm()) return;

    const index = students.findIndex(s => s.id === editId);

    if (index === -1) return;

    students[index].name = nameInput.value.trim();
    students[index].roll = rollInput.value.trim();
    students[index].course = courseInput.value.trim();
    students[index].branch = branchInput.value.trim();
    students[index].semester = semesterInput.value.trim();
    students[index].email = emailInput.value.trim();
    students[index].phone = phoneInput.value.trim();

    saveStudents();
    displayStudents();

    studentForm.reset();

    editId = null;

    addBtn.disabled = false;
    updateBtn.disabled = true;

    alert("Student Updated Successfully!");

});

// Disable Update Button Initially
updateBtn.disabled = true;

// ------------------------------
// Delete Student
// ------------------------------
function deleteStudent(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    students = students.filter(student => student.id !== id);

    saveStudents();

    displayStudents();

    alert("Student Deleted Successfully!");

}

// ------------------------------
// Live Search
// ------------------------------
searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {

        const rowText = row.innerText.toLowerCase();

        if (rowText.includes(keyword)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});
