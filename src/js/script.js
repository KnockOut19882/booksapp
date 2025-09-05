'use strict';

class BooksList {
  constructor() {
    this.favoriteBooks = [];
    this.filtersForBook = [];
    this.getElements();
    this.render();
    this.initActions();
  }
  getElements() {
    this.booksList = document.querySelector('.books-list');
    this.filters = document.querySelector('.filters');
    this.templateBook = document.getElementById('template-book').innerHTML;
  }
  initActions() {
    this.booksList.addEventListener('dblclick', (event) => {
      const image = event.target.closest('.book__image');
      if (!image) return;

      event.preventDefault();
      const bookId = image.getAttribute('data-id');
      if (!this.favoriteBooks.includes(bookId)) {
        image.classList.add('favorite');
        this.favoriteBooks.push(bookId);
      } else {
        image.classList.remove('favorite');
        const index = this.favoriteBooks.indexOf(bookId);
        if (index !== -1) {
          this.favoriteBooks.splice(index, 1);
        }
      }
    });

    this.filters.addEventListener('change', (event) => {
      const el = event.target;
      if (
        el.tagName === 'INPUT' &&
        el.type === 'checkbox' &&
        el.name === 'filter'
      ) {
        this.filterBooks();
      }
    });
  }
  render() {
    const template = Handlebars.compile(this.templateBook);
    this.booksList.innerHTML = '';
    for (const book of dataSource.books) {
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      const bookData = {};
      for (var key in book) {
        bookData[key] = book[key];
      }
      bookData.ratingBgc = ratingBgc;
      bookData.ratingWidth = ratingWidth;
      const generatedHTML = template(bookData);
      this.booksList.insertAdjacentHTML('beforeend', generatedHTML);
    }
  }
  filterBooks() {
    const filterCheckboxes = this.filters.querySelectorAll('input[name="filter"]');
    this.filtersForBook.length = 0;
    filterCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        this.filtersForBook.push(checkbox.value);
      }
    });

    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of this.filtersForBook) {
        if (book.details[filter] !== true) {
          shouldBeHidden = true;
          break;
        }
      }
      const image = this.booksList.querySelector('.book__image[data-id="' + book.id + '"]');
      if (image) {
        if (shouldBeHidden) {
          image.classList.add('hidden');
        } else {
          image.classList.remove('hidden');
        }
      }
    }
  }
  determineRatingBgc(rating) {
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
}

const app = new BooksList();