import { setupModal } from './modules/modal';
import { fetchData } from './modules/dataFetcher';

// модальне вікно
setupModal();

// запит до API
fetchData('https://jsonplaceholder.typicode.com/todos/1')
  .then(todo => {
    
    console.log('Fetched todo:', todo);
  })
  .catch(error => {
   
    console.error('Error during fetch:', error);
  });