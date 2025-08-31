'use strict';

// Referencja do szablonu książki
const templateBook = document.getElementById('template-book').innerHTML;

// Referencja do listy książek
const booksList = document.querySelector('.books-list');

function render() {
  const template = Handlebars.compile(templateBook);
  booksList.innerHTML = '';
  for(const book of dataSource.books) {
    const generatedHTML = template(book);
    booksList.insertAdjacentHTML('beforeend', generatedHTML);
  }
}

render();

const favoriteBooks = [];

function initActions() {
  const bookImages = booksList.querySelectorAll('.book__image');
  for(const image of bookImages) {
    image.addEventListener('dblclick', function(event) {
      event.preventDefault();
      const bookId = image.getAttribute('data-id');
      if(!favoriteBooks.includes(bookId)) {
        image.classList.add('favorite');
        favoriteBooks.push(bookId);
      } else {
        image.classList.remove('favorite');
        const index = favoriteBooks.indexOf(bookId);
        if(index !== -1) {
          favoriteBooks.splice(index, 1);
        }
      }
    });
  }
}

initActions();