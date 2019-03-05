class Task {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._state = {
    };
    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).find((item) => item === true);
  }

  _onEditButtonClick() {
    return typeof this._onEdit === `function` && this._onEdit();
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

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    const cardMarkdown = `
  <article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
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
    cardTemplate.innerHTML = cardMarkdown;
    return cardTemplate.content.cloneNode(true).firstChild;
  }

  render() {
    this._element = this.template;
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }
}

export {Task};
