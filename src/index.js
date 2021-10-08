// @ts-check
"use-strict";

let myLeads = [];
const inputElement = document.querySelector("#input-element");
const inputButton = document.querySelector("#save-input-button");
const unorderedListElement = document.querySelector("#unordered-list-element");

// localStorage.clear();

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  processLeads();
} // else, no leads to process, doNothing();

inputButton?.addEventListener("click", function() {
  myLeads.push(inputElement?.value);
  inputElement.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  processLeads();
})

function processLeads() {
  let listItems = "";
  for (let index = 0; index < myLeads.length; index++) {
    listItems = `${listItems}
      <li>
        <a href="${myLeads[index]}" target="_blank" rel="noopener noreferrer">
          ${myLeads[index]}
        </a>
      </li>
    `;
  }
  unorderedListElement.innerHTML = listItems;
}
