import icons from "url:../../img/icons.svg"; // parcel 1 doesnt need the url: part

class ResultsView {
  #parentElement = document.querySelector(".results");
  #data;
  #errorMessage = "something went wrong";
  #message = "success";

  _clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          `;
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _x(data) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a class="preview__link ${
          data.id === id ? "preview__link--active" : ""
        }" href="#${data.id}">
          <figure class="preview__fig">
            <img src="${data.image}" alt="${data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${data.title}</h4>
            <p class="preview__publisher">${data.publisher}</p>
            <div class="preview__user-generated ${
              data.key ? "" : "hidden"
            }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }

    _generateMarkup() {
    return this.#data.map(result => this._x(result, false)).join('');
  }

  renderError(message = this.#errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
    this._clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this.#message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
    this._clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  render(data) {
    this.#data = data;


    this._clear();

    let markup = this._generateMarkup();

    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ResultsView();
