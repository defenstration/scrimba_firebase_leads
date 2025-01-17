

const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const input = document.getElementById("input")
const list = document.getElementById("leads-list")
const storedLeads =  JSON.parse(localStorage.getItem("myLeads"))

let myLeads = []

// Page load render
if (storedLeads) {
    myLeads = storedLeads
    render(myLeads)
}

// Render Function

function render(leads) {
    let listItems = ''
    for (let lead of leads) {
        listItems += `<li class = "list-item"><a href = "${lead}" target = "_blank" >${lead}</a></li>`
    }
    list.innerHTML = listItems
}

// Save tab button 

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

// Save input button

inputBtn.addEventListener("click", () => {
    console.log("clicked")
    myLeads.push(`https://${input.value}`)
    input.textContent = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

// Delete button

deleteBtn.addEventListener("click", () => {
    input.textContent = ''
    localStorage.clear()
    myLeads = []
    render(myLeads)
})