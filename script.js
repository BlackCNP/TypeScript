"use strict";
//  типи
const modal = document.getElementById('myModal');
const openButton = document.getElementById('openModal');
const closeButton = document.getElementById('closeModal');
// Відкриття модального вікна
openButton === null || openButton === void 0 ? void 0 : openButton.addEventListener('click', () => {
    if (modal) {
        modal.style.display = 'block';
    }
});
closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener('click', () => {
    if (modal) {
        modal.style.display = 'none';
    }
});
// Витягування даних  fetch
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(data => {
    console.log(data);
})
    .catch(error => {
    console.error('Error fetching data:', error);
});
