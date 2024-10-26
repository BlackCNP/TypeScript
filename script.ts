//  типи
const modal: HTMLElement | null = document.getElementById('myModal');
const openButton: HTMLElement | null = document.getElementById('openModal');
const closeButton: HTMLElement | null = document.getElementById('closeModal');

// Відкриття модального вікна
openButton?.addEventListener('click', () => {
  if (modal) {
    modal.style.display = 'block';
  }
});


closeButton?.addEventListener('click', () => {
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
