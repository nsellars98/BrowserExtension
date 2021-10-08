// @ts-check
"use-strict";

let myLeads = [];
const inputElement = document.querySelector("#input-element");
const inputButton = document.querySelector("#save-input-button");
const tabButton = document.querySelector("#save-tab-button");
const deleteButton = document.querySelector("#delete-button");
const unorderedListElement = document.querySelector("#unordered-list-element");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  process(myLeads);
} // else, no leads to process, doNothing();

function process(leads) {
  let listItems = "";
  for (let index = 0; index < leads.length; index++) {
    listItems = `${listItems}
      <li>
        <a href="${leads[index]}" target="_blank" rel="noopener noreferrer">
          ${leads[index]}
        </a>
      </li>
    `;
  }
  unorderedListElement.innerHTML = listItems;
}

inputButton?.addEventListener("click", function() {
  myLeads.push(inputElement?.value);
  inputElement.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  process(myLeads);
})

tabButton?.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    process(myLeads);
  })
})

deleteButton?.addEventListener("dblclick", function() {
  localStorage.clear();
  myLeads = [];
  process(myLeads);
})
