$(document).ready(async function () {
    await loadStudents();
});

async function loadStudents() {
    const url = "/Student/GetStudentList";
    const students = await ajaxGetAsync(url);
    const dataTable = $('#student-grid').DataTable({
        data: students, // Provide your data array here
        columns: [
            { data: 'id', className: 'dt-center' },
            { data: 'name', className: 'dt-center' },
            { data: 'email', className: 'dt-center' },
            { data: 'phone', className: 'dt-center' },
            { data: 'address', className: 'dt-center' },
            { data: 'dateOfEnroll', className: 'dt-center' }
        ],
        paging: false, // Disable pagination
        searching: false // Disable search
    });
}

let ajaxGetAsync = async (url, data) => {
    return await $.ajax({
        type: 'GET',
        url: `${url}`,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: data,
        success: function (response) {
            return response;
        },
        error: function (error) {
            return error;
        }
    });
}


function addStudent() {
    const url = "/Student/Create";
    safelyNavigateTo(url);
}

async function saveStudent(event) {
    const student = serializeFormData();  
    const url = "Student/SaveStudent";
    debugger;   
    await ajaxPostAsync(url, student)
        .then((response) => {
            console.log(response)
            if (response === true) {
                const url = `/Student/Index`;
                safelyNavigateTo(url);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

let ajaxPostAsync = async (url, data) => {
    return await $.ajax({
        type: 'POST',
        url: `${url}`,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (response) {
            return response;
        },
        error: function (error) {
            return error;
        }
    });
}


function serializeFormData() {
    const form = document.getElementById('student-form');
    const formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
        if (value === "") {
            formData.set(key, null);
        }
    }

    const serializedData = Object.fromEntries(formData);
    return serializedData;
}

function safelyNavigateTo(route) {
    window.location.href = route;
}
