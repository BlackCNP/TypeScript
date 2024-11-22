import { Todo } from '../types/types';

// дані з API
export function fetchData(url: string): Promise<Todo> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data as Todo; 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error; 
    });
}