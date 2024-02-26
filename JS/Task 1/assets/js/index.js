let counter = 3;
var container = document.getElementById("form-lower");
const table = document.getElementById("tbody");
const form = document.getElementById("form");
const identity = document.getElementById("identity");
const submitBtn = document.getElementById("submitBtn");
const modal = document.getElementById("myModal");
let userCount = 0;
var data = {
    education: {}
};
var data_new = {
};
function deleteRow(index) {
    var elem = document.getElementById("row" + index);
    var hr = document.getElementById(`hr${index}`);
    // console.log(elem);
    container.removeChild(elem);
    container.removeChild(hr);
}
function addRow() {
    const elem = document.getElementById("row2").cloneNode(true);

    elem.childNodes[1].childNodes[1].childNodes[4].value = ""
    elem.childNodes[3].childNodes[1].childNodes[4].value = ""
    elem.childNodes[9].childNodes[1].childNodes[4].value = ""
    elem.childNodes[11].childNodes[1].childNodes[4].value = ""

    // console.log(elem.childNodes[13].childNodes[1]);
    const nodem = document.createElement("i");
    const hr = document.createElement("hr");

    hr.setAttribute("style", "width:100%");
    hr.setAttribute("id", `hr${counter}`);

    nodem.setAttribute("class", "fa fa-minus ms-auto")
    elem.childNodes[13].childNodes[1].setAttribute("onclick", `deleteRow(${counter})`);
    elem.childNodes[13].childNodes[1].classList.add("delete-btn-active");

    elem.setAttribute("id", "row" + counter);
    // elem.appendChild(nodem);
    counter++;
    container.appendChild(hr);
    container.appendChild(elem);
    const degree = document.getElementsByClassName("degree");
    const school = document.getElementsByClassName("school");
    const start = document.getElementsByClassName("startDate");
    const passout = document.getElementsByClassName("passout");
    const percentage = document.getElementsByClassName("percentage");
    const backlog = document.getElementsByClassName("backlog");

    for (let elem of degree) {
        elem.addEventListener("keyup", (e) => {
            checkForEducation(e.target)
        });
    }
    for (let elem of school) {
        elem.addEventListener("keyup", (e) => {
            console.log("added new ", e)
            checkForEducation(e.target);
        });
    }
    for (let elem of percentage) {
        elem.addEventListener("keyup", (e) => {
            checkForPercentage(e.target);
        });
    }
    for (let elem of backlog) {
        elem.addEventListener("keyup", (e) => {
            checkForBacklog(e.target);
        });
    }
    // console.log(elem);
}
function getData() {
    const firstName = document.forms[0]["fname"].value;
    const lastName = document.forms[0]["lname"].value;
    const dob = document.forms[0]["dob"].value;
    const email = document.forms[0]["email"].value;
    const address = document.forms[0]["address"].value;
    const graduation = document.forms[0]["gy"].value;
    let status = 1;
    const obj = {};
    obj.education = [];
    if (!checkText("fname", firstName) || !checkText("lname", lastName) || !checkDOB(dob) ||
        !checkEmail(email) ||
        !checkAddress(address) ||
        !checkGY(dob, graduation)
    ) {
        status = 0;
        return;
    }
    const degree = document.getElementsByClassName("degree");
    const school = document.getElementsByClassName("school");
    const start = document.getElementsByClassName("startDate");
    const passout = document.getElementsByClassName("passout");
    const percentage = document.getElementsByClassName("percentage");
    const backlog = document.getElementsByClassName("backlog");

    for (let i = 0; i < degree.length; i++) {
        if (!checkForEducation(degree[i]) || !checkForEducation(school[i]) || !checkForPercentage(percentage[i]) || !checkForBacklog(backlog[i])) {
            status = 0;
        }
    }
    for (let i = 0; i < degree.length; i++) {
        const date1 = new Date(start[i].value);
        const date2 = new Date(passout[i].value);
        // console.log(date1.getFullYear(), date2.getFullYear());
        // console.log((date1.getFullYear() + 4) <= date2.getFullYear());
        if (date1.getFullYear() + 4 <= date2.getFullYear()) {
            start[i].style.border = "1px solid black";
            start[i].nextSibling.nextSibling.removeAttribute("class");
            start[i].nextSibling.nextSibling.innerHTML = "";
            passout[i].style.border = "1px solid black";
            passout[i].nextSibling.nextSibling.removeAttribute("class");
            passout[i].nextSibling.nextSibling.innerHTML = "";
            continue;
        }
        else {
            status = 0;
            start[i].style.border = "2px solid red";
            start[i].nextSibling.nextSibling.setAttribute("class", "red_error");
            start[i].nextSibling.nextSibling.innerHTML = "start-passout date is not valid";
            passout[i].style.border = "2px solid red";
            passout[i].nextSibling.nextSibling.setAttribute("class", "red_error");
            passout[i].nextSibling.nextSibling.innerHTML = "start-passout date is not valid";
        }
    }
    if (status == 0) {
        console.log("something not good");
        return;
    }
    else {
        obj.firstName = firstName;
        obj.lastName = lastName;
        obj.dob = dob;
        obj.email = email;
        obj.address = address;
        obj.graduation = graduation;
        for (let i = 0; i < degree.length; i++) {
            let temp2 = {};
            temp2.degree = degree[i].value;
            temp2.school = school[i].value;
            temp2.startDate = start[i].value;
            temp2.passout = passout[i].value;
            temp2.backlog = backlog[i].value;
            temp2.percentage = percentage[i].value;
            obj.education.push(temp2);
        }
        // console.log(obj);
        data_new["item" + userCount] = obj;
        userCount++;
        console.log("Form Data = ", data_new);
        displayNewData(data_new);
      

    }

    form.reset();
}
function displayData(e) {
    table.innerHTML = "";
    identity.innerHTML = "";

    let count = 0;
    for (let key in e) {
        if (key == "education" || e[key] == "") {
            console.log(e.key);
            continue;
        }
        else {
            const p = document.createElement("p");
            p.innerHTML = `${key} = ${e[key]}`;
            identity.appendChild(p);
        }
    }
    for (let key in e.education) {
        // console.log(key);
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const td6 = document.createElement("td");
        const td7 = document.createElement("td");

        td1.innerHTML = e.education[key].degree;
        td2.innerHTML = e.education[key].school;
        td3.innerHTML = e.education[key].startDate;
        td4.innerHTML = e.education[key].passout;
        td5.innerHTML = e.education[key].percentage;
        td6.innerHTML = e.education[key].backlog;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.setAttribute("id", "tableRow" + count);

        td7.innerHTML = `
        <button class="submitButton p-2  edit-btn" onclick="edit(${count})">
            Edit
        </button>
        <button class="submitButton p-2 delete-btn" onclick="deleteRowTable(${count})">
            Delete
        </button>
        `;
        count++;
        tr.appendChild(td7);
        table.appendChild(tr);
    }
    // for (let obj of e.education) {
    //     const tr = document.createElement("tr");
    //     const td1 = document.createElement("td");
    //     const td2 = document.createElement("td");
    //     const td3 = document.createElement("td");
    //     const td4 = document.createElement("td");
    //     const td5 = document.createElement("td");
    //     const td6 = document.createElement("td");
    //     const td7 = document.createElement("td");

    //     td1.innerHTML = obj.degree;
    //     td2.innerHTML = obj.school;
    //     td3.innerHTML = obj.startDate;
    //     td4.innerHTML = obj.passout;
    //     td5.innerHTML = obj.percentage;
    //     td6.innerHTML = obj.backlog;

    //     tr.appendChild(td1);
    //     tr.appendChild(td2);
    //     tr.appendChild(td3);
    //     tr.appendChild(td4);
    //     tr.appendChild(td5);
    //     tr.appendChild(td6);
    //     tr.setAttribute("id", "tableRow" + count);
    //     const temp1 = JSON.stringify(obj);
    //     console.log(temp1);
    //     td7.innerHTML = `
    //     <button class="edit-btn" onclick="edit(${count})">
    //         Edit
    //     </button>
    //     <button class="delete-btn" onclick="deleteRow(${count})">
    //         Delete
    //     </button>
    //     `;
    //     count++;
    //     tr.appendChild(td7);
    //     table.appendChild(tr);
    // }
}
function displayNewData(e) {
    let count = 0;
    table.innerHTML = "";
    for (let key in e) {
        // console.log(key);
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const td6 = document.createElement("td");
        const td7 = document.createElement("td");

        td1.innerHTML = e[key].firstName;
        td2.innerHTML = e[key].lastName;
        td3.innerHTML = e[key].dob;
        td4.innerHTML = e[key].email;
        td5.innerHTML = e[key].address;
        td6.innerHTML = e[key].graduation;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        tr.setAttribute("id", "tableRow" + count);
        td7.innerHTML = `
        <button class="submitButton edit-btn p-2"  data-bs-toggle="modal" data-bs-target="#myModal" onclick="editNew(${count})">
            Edit
        </button>
        <button class="submitButton p-2 delete-btn ms-2 " onclick="deleteRowTableNew(${count})">
            Delete
        </button>
        `;
        count++;
        tr.appendChild(td7);
        table.appendChild(tr);
    }
}
function edit(row) {
    const elem = document.getElementById("tableRow" + row);
    const tds = elem.getElementsByTagName("td");

    for (let i = 0; i < tds.length; i++) {
        let dataType = "text";
        if (i == 2 || i == 3) {
            dataType = "month"
        }
        else if (i == 5) {
            dataType = "number";
        }
        else if (i == 6) {
            tds[i].innerHTML = `<button class="submitButton p-2 save-btn" onclick="save(${row})">save</button>`;
            continue;
        }
        tds[i].innerHTML = `<input type=${dataType} value="${tds[i].innerText}"></input>`;
    }
}
function editNew(row) {
    const obj = data_new["item" + row];
    console.log(data_new["item" + row]);
    submitBtn.innerText = "Save";
    submitBtn.setAttribute("onclick", `saveUpdatedData(${row})`);
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const dob = document.getElementById("dob");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const gy = document.getElementById("gy");

    fname.value = obj.firstName;
    lname.value = obj.lastName;
    dob.value = obj.dob;
    email.value = obj.email;
    address.value = obj.address;
    gy.value = obj.graduation;


    for (let i = 4; i < obj.education.length; i++) {
        addRow();
    }

    const degree = document.getElementsByClassName("degree");
    const school = document.getElementsByClassName("school");
    const start = document.getElementsByClassName("startDate");
    const passout = document.getElementsByClassName("passout");
    const percentage = document.getElementsByClassName("percentage");
    const backlog = document.getElementsByClassName("backlog");

    for (let i = 0; i < degree.length; i++) {
        degree[i].value = obj.education[i].degree;
        school[i].value = obj.education[i].school;
        start[i].value = obj.education[i].startDate;
        passout[i].value = obj.education[i].passout;
        percentage[i].value = obj.education[i].percentage;
        backlog[i].value = obj.education[i].backlog;
    }
}

function saveUpdatedData(row) {
    const obj1 = data_new["item" + row];
    const firstName = document.forms[0]["fname"].value;
    const lastName = document.forms[0]["lname"].value;
    const dob = document.forms[0]["dob"].value;
    const email = document.forms[0]["email"].value;
    const address = document.forms[0]["address"].value;
    const graduation = document.forms[0]["gy"].value;
    let status = 1;
    const obj = {};
    obj.education = [];
    if (!checkText("fname", firstName) || !checkText("lname", lastName) || !checkDOB(dob) ||
        !checkEmail(email) ||
        !checkAddress(address) ||
        !checkGY(dob, graduation)
    ) {
        status = 0;
        return;
    }
    const degree = document.getElementsByClassName("degree");
    const school = document.getElementsByClassName("school");
    const start = document.getElementsByClassName("startDate");
    const passout = document.getElementsByClassName("passout");
    const percentage = document.getElementsByClassName("percentage");
    const backlog = document.getElementsByClassName("backlog");

    for (let i = 0; i < degree.length; i++) {
        if (!checkForEducation(degree[i]) || !checkForEducation(school[i]) || !checkForPercentage(percentage[i]) || !checkForBacklog(backlog[i])) {
            status = 0;
            break;
        }
    }
    for (let i = 0; i < degree.length; i++) {
        const date1 = new Date(start[i].value);
        const date2 = new Date(passout[i].value);
        // console.log(date1.getFullYear(), date2.getFullYear());
        // console.log((date1.getFullYear() + 4) <= date2.getFullYear());
        if (date1.getFullYear() + 4 <= date2.getFullYear()) {
            start[i].style.border = "1px solid black";
            start[i].nextSibling.nextSibling.removeAttribute("class");
            start[i].nextSibling.nextSibling.innerHTML = "";
            passout[i].style.border = "1px solid black";
            passout[i].nextSibling.nextSibling.removeAttribute("class");
            passout[i].nextSibling.nextSibling.innerHTML = "";
            continue;
        }
        else {
            status = 0;
            start[i].style.border = "2px solid red";
            start[i].nextSibling.nextSibling.setAttribute("class", "red_error");
            start[i].nextSibling.nextSibling.innerHTML = "start-passout date is not valid";
            passout[i].style.border = "2px solid red";
            passout[i].nextSibling.nextSibling.setAttribute("class", "red_error");
            passout[i].nextSibling.nextSibling.innerHTML = "start-passout date is not valid";
        }
    }
    if (status == 0) {
        console.log("something not good");
        return;
    }
    else {
        obj.firstName = firstName;
        obj.lastName = lastName;
        obj.dob = dob;
        obj.email = email;
        obj.address = address;
        obj.graduation = graduation;
        for (let i = 0; i < degree.length; i++) {
            let temp2 = {};
            temp2.degree = degree[i].value;
            temp2.school = school[i].value;
            temp2.startDate = start[i].value;
            temp2.passout = passout[i].value;
            temp2.backlog = backlog[i].value;
            temp2.percentage = percentage[i].value;
            obj.education.push(temp2);
        }
        console.log(obj);
        data_new["item" + row] = obj;
        console.log("updated From Data = ", data_new);
        displayNewData(data_new);
       
    }
    // if (!checkDOB(dob)) {
    // }
    // console.log(document.forms);
    // var data = {
    //     education: []
    // };
    // data = {
    //     education: {}
    // };
    // data.firstName = document.forms[0]["fname"].value;
    // data.lastName = document.forms[0]["lname"].value;
    // data.dob = document.forms[0]["dob"].value;
    // data.email = document.forms[0]["email"].value;
    // data.address = document.forms[0]["address"].value;
    // data.graduation = document.forms[0]["gy"].value;



    // for (let i = 0; i < degree.length; i++) {
    //     const obj = {};
    //     if (degree[i].value == "" && school[i].value == "" && start[i].value == "" && passout[i].value == "" && percentage[i].value == "" && backlog[i].value == "") {
    //         // console.log("object is empty");
    //         continue;
    //     }
    //     else {
    //         obj.degree = degree[i].value;
    //         obj.school = school[i].value;
    //         obj.startDate = start[i].value;
    //         obj.passout = passout[i].value;
    //         obj.percentage = percentage[i].value;
    //         obj.backlog = backlog[i].value;
    //         data.education["row" + i] = obj;
    //     }
    // }
    // console.log("Form Data", data);
    // displayData(data);
    form.reset();

}
function save(row) {
    const elem = document.getElementById("tableRow" + row);
    const tds = elem.getElementsByTagName("td");
    const keys = ["degree", "school", "startDate", "passout", "percentage", "backlog"];

    let count = 0;
    const temp = {};
    for (let key of keys) {
        temp[key] = tds[count].querySelectorAll("input")[0].value;
        tds[count].innerHTML = tds[count].querySelectorAll("input")[0].value;
        count++;
    }
    tds[count].innerHTML = `
    <button class="submitButton p-2  edit-btn" onclick="edit(${row})">Edit</button>
    <button class="submitButton p-2  delete-btn" onclick="deleteRowTable(${row})">
            Delete
        </button>
    `;
    data.education["row" + row] = temp;
    console.log("Updated Form Data", data);
}
function deleteRowTable(row) {
    const tempRow = document.getElementById("tableRow" + row);
    tempRow.remove();
    delete data.education["row" + row];
    console.log("Updated Form Data", data);
}
function deleteRowTableNew(row){
    delete data_new["item"+row];
    document.getElementById("tableRow"+row).remove();
}
function checkText(id, data) {
    // console.log(document.forms[0][id].nextSibling);
    if (/^[a-zA-Z]{3,}$/.test(data)) {
        document.forms[0][id].style.border = "1px solid black";
        document.forms[0][id].nextSibling.nextSibling.innerHTML = "";
        return true;
    }
    else {
        document.forms[0][id].style.border = "2px solid red";
        document.forms[0][id].nextSibling.nextSibling.innerHTML = "*Name Is Not Valid";
        return false;
    }
}
function checkDOB(data) {
    const date_temp = new Date(data);
    const date_temp2 = new Date("2006-01-01");

    if (date_temp <= date_temp2) {
        document.forms[0]["dob"].style.border = "1px solid black";
        document.forms[0]["dob"].nextSibling.nextSibling.innerHTML = "";
        return true;
    }
    else {
        document.forms[0]["dob"].style.border = "2px solid red";
        document.forms[0]["dob"].nextSibling.nextSibling.innerHTML = "Age Should Greater than 18";
        return false;
    }
}
function checkEmail(data) {
    if (/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(data)) {
        document.forms[0]["email"].style.border = "1px solid black"
        document.forms[0]["email"].nextSibling.nextSibling.innerHTML = "";
        return true;
    }
    else {
        document.forms[0]["email"].style.border = "2px solid red";
        document.forms[0]["email"].nextSibling.nextSibling.innerHTML = "*Email Is Not Valid";
        return false;
    }
}
function checkAddress(data) {
    if (data.length >= 20) {
        document.forms[0]["address"].style.border = "1px solid black";
        document.forms[0]["address"].nextSibling.nextSibling.innerHTML = "";
        return true;
    }
    else {
        document.forms[0]["address"].style.border = "2px solid red";
        // document.forms[0]["address"].nextSibling.nextSibling.setAttribute("class", "red_error");
        document.forms[0]["address"].nextSibling.nextSibling.innerHTML = "Address Must gretaer than 20 characters";
        return false;
    }
}
function checkGY(dob, data) {
    const db = new Date("2006-01-01");
    const gy = new Date(data);
    const current = new Date();
    // console.log(db, gy, current);
    if (db < gy) {
        document.forms[0]["gy"].style.border = "1px solid black";
        document.forms[0]["gy"].nextSibling.nextSibling.innerHTML = "";
        return true;
    }
    else {
        document.forms[0]["gy"].style.border = "2px solid red";
        document.forms[0]["gy"].nextSibling.nextSibling.innerHTML = "*Graduation Sholud Not Before Birth";
        return false;
    }
}
function checkForEducation(data) {
    // console.log(data.target);
    // console.log(data.target.nextSibling.nextSibling);
    if (/^[a-zA-Z]+$/.test(data.value)) {
        data.style.border = "1px solid black";
        data.nextSibling.nextSibling.innerHTML = "";
        return true;
    }
    else {
        data.style.border = "2px solid red";
        data.nextSibling.nextSibling.innerHTML = "Degree Should be in Text";
        return false;
    };
}


function checkForPercentage(data) {
    const val = parseFloat(data.value);

   
    if(!/^[0-9]+$/.test(data.value)){
        data.style.border = "2px solid red";
      
        data.nextSibling.nextSibling.innerHTML = "Text Not Allowed";
        return false;
    }
    else if ( isNaN(val) || val < 0 || val > 99.99) {
        data.style.border = "2px solid red";
        // data.nextSibling.nextSibling.setAttribute("class", "red_error");
        data.nextSibling.nextSibling.innerHTML = "Percentage Should be in range 0-100";
        return false;
    }
    else {
        data.style.border = "1px solid black";
        // data.target.nextSibling.nextSibling.setAttribute("class","red_error");
        data.nextSibling.nextSibling.innerHTML = "";
        // console.log(val);
        return true;
    }
}
function checkForBacklog(data) {

    if (data.value < 0) {
        data.style.border = "2px solid red";
        data.nextSibling.nextSibling.innerHTML = "Negative Backlog Not Allowed";
        return false;
    }
    else if (data.value > 40) {
        data.style.border = "2px solid red";
        data.nextSibling.nextSibling.innerHTML = "Baclog not more than total subjects";
        return false;
    }
    else {
        data.style.border = "1px solid black";
        data.nextSibling.nextSibling.innerHTML = "";
        return true;
    }
}
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const dob = document.getElementById("dob");
const email = document.getElementById("email");
const address = document.getElementById("address");
const gy = document.getElementById("gy");
const degree = document.getElementsByClassName("degree");
const school = document.getElementsByClassName("school");
const start = document.getElementsByClassName("startDate");
const passout = document.getElementsByClassName("passout");
const percentage = document.getElementsByClassName("percentage");
const backlog = document.getElementsByClassName("backlog");
fname.addEventListener("keyup", () => {
    checkText("fname", fname.value);
})
lname.addEventListener("keyup", () => {
    checkText("lname", lname.value);
})
dob.addEventListener("change", () => {
    checkDOB(dob.value);
})
email.addEventListener("keyup", () => {
    checkEmail(email.value);
})
address.addEventListener("keyup", () => {
    if (address.value.length >= 20) {
        address.style.border = "1px solid black";
        address.nextSibling.nextSibling.innerHTML = "";
    }
    else {
        address.style.border = "2px solid red";
        address.nextSibling.nextSibling.setAttribute("class", "red_error");
        address.nextSibling.nextSibling.innerHTML = "Address Must gretaer than 20 characters";
    }
})
gy.addEventListener("change", () => {
    checkGY(dob.value, gy.value);
})
for (let elem of degree) {
    elem.addEventListener("keyup", (e) => {
        checkForEducation(e.target);
    });
}
for (let elem of school) {
    elem.addEventListener("keyup", (e) => {
        checkForEducation(e.target);
    });
}
for (let elem of percentage) {
    elem.addEventListener("keyup", (e) => {
        checkForPercentage(e.target);
    });
    // elem.addEventListener("change",(e)=>{
    //     if(!checkForPercentage(e.target)){
    //         const arr = e.target.value.split("%")
    //         console.log(arr[arr.length-1]);
    //         e.target.value =arr[arr.length-1];
    //     }
    //     else{
    //         const arr = e.target.value.split("%")
    //         console.log(arr[arr.length-1]);
    //         e.target.value = e.target.value + "%";
    //     }
    // }
    // )
}
for (let elem of backlog) {
    elem.addEventListener("keyup", (e) => {
        checkForBacklog(e.target);
    });
}
function updateButtonText() {
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.innerText = "Submit";
    submitBtn.setAttribute("onclick", "getData()");

}