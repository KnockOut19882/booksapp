// Funkcja zwracająca background na podstawie ratingu
function determineRatingBgc(rating) {
  let background = '';
  if (rating < 6) {
    background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
  } else if (rating >= 6 && rating <= 8) {
    background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
  } else if (rating > 8 && rating <= 9) {
    background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  } else if (rating > 9) {
    background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
  }
  return background;
}
'use strict';

// Referencja do szablonu książki
const templateBook = document.getElementById('template-book').innerHTML;

// Referencja do listy książek
const booksList = document.querySelector('.books-list');
//Referencja do filtrów
const filters = document.querySelector('.filters');

function render() {
  const template = Handlebars.compile(templateBook);
  booksList.innerHTML = '';
  for(const book of dataSource.books) {
    // Stała ratingBgc na podstawie ratingu
    const ratingBgc = determineRatingBgc(book.rating);
    // Stała ratingWidth na podstawie ratingu
    const ratingWidth = book.rating * 10;
    // Przekazanie dodatkowych danych do szablonu
    const bookData = {};
    for (var key in book) {
      bookData[key] = book[key];
    }
    bookData.ratingBgc = ratingBgc;
    bookData.ratingWidth = ratingWidth;
    const generatedHTML = template(bookData);
    booksList.insertAdjacentHTML('beforeend', generatedHTML);
  }
}

render();

const favoriteBooks = [];
const filtersForBook = [];

function filterBooks() {
  // Pobierz wszystkie checkboxy filtrujące
  const filterCheckboxes = filters.querySelectorAll('input[name="filter"]');
  // Zaktualizuj tablicę filtersForBook
  filtersForBook.length = 0;
  filterCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      filtersForBook.push(checkbox.value);
    }
  });

  // Przejdź po wszystkich książkach
  for (const book of dataSource.books) {
    let shouldBeHidden = false;
    // Pętla po filtrach
    for (const filter of filtersForBook) {
      if (book.details[filter] !== true) {
        shouldBeHidden = true;
        break;
      }
    }
    // Znajdź element .book__image danej książki
    const image = booksList.querySelector('.book__image[data-id="' + book.id + '"]');
    if (image) {
      if (shouldBeHidden) {
        image.classList.add('hidden');
      } else {
        image.classList.remove('hidden');
      }
    }
  }
}

function initActions() {
  booksList.addEventListener('dblclick', function(event) {
    const image = event.target.closest('.book__image');
    if (!image) return; // kliknięto poza .book__image

    event.preventDefault();
    const bookId = image.getAttribute('data-id');
    if (!favoriteBooks.includes(bookId)) {
      image.classList.add('favorite');
      favoriteBooks.push(bookId);
    } else {
      image.classList.remove('favorite');
      const index = favoriteBooks.indexOf(bookId);
      if (index !== -1) {
        favoriteBooks.splice(index, 1);
      }
    }
  });
  // Nasłuchiwacz na zmianę checkboxów w formularzu filtrów
  filters.addEventListener('change', function(event) {
    const el = event.target;
    if (
      el.tagName === 'INPUT' &&
      el.type === 'checkbox' &&
      el.name === 'filter'
    ) {
      filterBooks();
    }
  });
}

initActions();