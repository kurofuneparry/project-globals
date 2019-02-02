class Item {
	constructor(text, state="none") { // An Item has "text" and "state" strings and can be "clicked"
		this.text = text;
		this.state = state;
	}
	clicked() { // When clicked an Item progresses from none to strike to invisible
		if (this.state == "none") {this.state = "strike";} 
		else if (this.state == "strike") {this.state = "invisible";}
	}
}

// If localStorage doesn't have items, then add it as a string representing an empty array
if(localStorage.getItem("items") == null) {localStorage.setItem("items", "[]");}
// JSON.parse interprets the string as an array of objects which are made into Items
parsed = JSON.parse(localStorage.getItem("items"));
items = [];
for (let i=0; i < parsed.length; i++) {
	items.push(new Item(parsed[i].text, parsed[i].state));
}

function createDiv(item) { // Creates a div for an Item, including a click listener
	div = document.createElement("div");
	div.innerHTML = item.text;
	div.classList.add(item.state);
	div.addEventListener("click", function (element) {
		item.clicked()
		localStorage.setItem("items", JSON.stringify(items));
		element.target.classList.add(item.state);
	})
	document.getElementById("container").appendChild(div);
}

// All Items are added to the web page
for (let i=0; i < items.length; i++) {createDiv(items[i]);}

function createItem() { // The user creates a new Item 
	newItem = new Item(prompt("Your new item prompt goes here"));
	items.push(newItem);
	localStorage.setItem("items", JSON.stringify(items));
	createDiv(newItem);
}
