import { NullableHTMLElement } from '../types/types';


const modal: NullableHTMLElement = document.getElementById('myModal');
const openButton: NullableHTMLElement = document.getElementById('openModal');
const closeButton: NullableHTMLElement = document.getElementById('closeModal');

// модальне вікно
export function setupModal(): void {
  if (openButton) {
    openButton.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'block';
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }
}
