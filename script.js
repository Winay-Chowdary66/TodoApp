const todoListEl = document.querySelector('.todo-list');
const form = document.querySelector('.form');
const input = document.querySelector('#user-input');
const addToList = document.querySelector('#add-to-list');
const searchTodo = document.getElementById('search-todo');
const recycle = document.getElementById('recycle');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	createTodo();
});

let todoValue = JSON.parse(localStorage.getItem('Todo'));
todoValue.forEach((todoo) => {
	createTodo(todoo);
});

addToList.addEventListener('click', () => {
	createTodo();
});

function createTodo(todoo) {
	let inputValue = input.value;
	if (todoo) {
		inputValue = todoo.todo;
	}
	if (inputValue) {
		let createListEls = document.createElement('li');
		let listAttr = document.createAttribute('class');
		listAttr.value = 'list-els';
		createListEls.setAttributeNode(listAttr);
		todoListEl.appendChild(createListEls);
		createListEls.innerText = inputValue;

		let createCheckBox = document.createElement('i');
		let checkBoxClassAttr = document.createAttribute('class');
		checkBoxClassAttr.value = 'far fa-check-circle';
		createCheckBox.setAttributeNode(checkBoxClassAttr);
		todoListEl.appendChild(createCheckBox);

		let createITag = document.createElement('i');
		let createIAttr = document.createAttribute('class');
		createIAttr.value = 'far fa-trash-alt';
		createITag.setAttributeNode(createIAttr);
		todoListEl.appendChild(createITag);

		createCheckBox.addEventListener('click', () => {
			createCheckBox.classList.toggle('red');
			createListEls.classList.toggle('finished');
			insertIntoLS();
		});

		createITag.addEventListener('click', () => {
			createListEls.remove();
			createCheckBox.remove();
			createITag.remove();
			insertIntoLS();
		});

		if (todoo && todoo.finished) {
			createListEls.classList.add('finished');
		}

		recycle.addEventListener('click', () => {
			recycle.style.color = 'rgb(86,255,71)';
			localStorage.removeItem('Todo');
			createListEls.remove();
		});

		input.value = '';
		insertIntoLS();
	}
	else {
		alert('Please enter Todo List');
	}
}

function insertIntoLS() {
	const todosEls = document.querySelectorAll('.list-els');

	const todos = [];

	todosEls.forEach((todosEl) => {
		todos.push({
			todo: todosEl.innerText,
			finished: todosEl.classList.contains('finished')
		});
	});

	localStorage.setItem('Todo', JSON.stringify(todos));
}
updateTime();
function updateTime() {
	const li = document.querySelectorAll('li');
	const iconsCheck = document.querySelectorAll('.fa-check-circle');
	const iconsTrash = document.querySelectorAll('.fa-trash-alt');
	searchTodo.addEventListener('keyup', () => {
		let searchTodoValue = searchTodo.value;
		let searchTodoValueLower = searchTodoValue.toUpperCase();

		for (let i = 0; i < li.length; i++) {
			let todoValue = li[i].textContent.toUpperCase();
			if (todoValue.indexOf(searchTodoValueLower) > -1 || searchTodoValueLower == '  ') {
				searchTodo.style.color = 'green';
				li[i].style.display = '';
				iconsCheck[i].style.display = 'inline-block';
				iconsTrash[i].style.display = 'inline-block';
			}
			else {
				li[i].style.display = 'none';
				iconsCheck[i].style.display = 'none';
				iconsTrash[i].style.display = 'none';
				searchTodo.style.color = 'red';
			}
		}
	});
}
