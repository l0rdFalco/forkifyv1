import icons from "url:../../img/icons.svg"; // parcel 1 doesnt need the url: part

class PaginationView {
  #parentElement = document.querySelector(".pagination");
  #data;
  #errorMessage = "something went wrong";
  #message = "success";

    _clear() {
    this.#parentElement.innerHTML = "";
  }


  addHandlerClick(cb) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      cb(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this.#data.page;
    const numPages = Math.ceil(
      this.#data.results.length / this.#data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }

    render(data) {
    this.#data = data;

    this._clear();

    let markup = this._generateMarkup();

    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new PaginationView();
