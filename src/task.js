import {Component} from './component';

class Task extends Component {
  constructor({title, dueDate, tags, picture, color, repeatingDays}) {
    super();
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;

    this._state = {
      isDate: this._dueDate,
      isRepeated: this._isRepeated(),
    };

    this._onEdit = null;
    this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).find((item) => item === true);
  }

  _getHashtags() {
    return [...this._tags].map((item) => {
      return `
      <span class="card__hashtag-inner">
        <button type="button" class="card__hashtag-name">
          #${item}
        </button>
      </span>
    `;
    }).join(``);
  }

  get template() {
    const cardMarkup = `
  <article class="card card--${this._color} ${this._state.isRepeated ? `card--repeat` : ``}">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >
  ${this._title}</textarea
          >
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">

            <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="${new Date(this._dueDate)}"
                  name="date"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="${new Date(this._dueDate)}"
                  name="time"
                />
              </label>
            </fieldset>

          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${this._getHashtags()}
            </div>

            <label>

            </label>
          </div>
        </div>

        <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
          <input
            type="file"
            class="card__img-input visually-hidden"
            name="img"
          />
          <img
            src="${this._picture ? this._picture : `img/add-photo.svg`}"
            alt="task picture"
            class="card__img"
          />
        </label>
      </div>
    </div>
  </form>
  </article>
  `.trim();

    const cardTemplate = document.createElement(`template`);
    cardTemplate.innerHTML = cardMarkup;
    return cardTemplate.content.cloneNode(true).firstChild;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
  }

  _addListeners() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick);
  }

  _removeListeners() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick);
  }
}

export {Task};
