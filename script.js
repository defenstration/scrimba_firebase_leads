// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-8f09d-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const referenceInDB = ref(database, "myLeads")

console.log(database)


const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const input = document.getElementById("input")
const list = document.getElementById("leads-list")

onValue(referenceInDB, (snapshot) => {
    if (snapshot.exists()) {
       render(Object.values(snapshot.val())) 
    } else {
        list.innerHTML = ''
    }
})


// Render Function

function render(leads) {
    let listItems = ''
    for (let lead of leads) {
        listItems += `<li class = "list-item"><a href = "${lead}" target = "_blank" >${lead}</a></li>`
    }
    list.innerHTML = listItems
}

// Save input button

inputBtn.addEventListener("click", () => {
    push(referenceInDB, input.value)
    input.value = ''
})

// Delete button

deleteBtn.addEventListener("click", () => {
    remove(referenceInDB)
    input.value = '' 
})
