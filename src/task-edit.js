class TaskEdit {
  constructor({title, dueDate, tags, picture, color, repeatingDays}) {
    this._title = title;
    this._dueDate = dueDate;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;

    this._element = null;
    this._state = {
    };
    this._onSubmit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).find((item) => item === true);
  }

  _getHashtags() {
    return [...this._tags].map((item) => {
      return `
      <span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="repeat"
          class="card__hashtag-hidden-input"
        />
        <button type="button" class="card__hashtag-name">
          #${item}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>
    `;
    }).join(``);
  }

  _getRepeatingDays() {
    return Object.values(this._repeatingDays).map((item) => {
      return `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-mo-3"
        name="repeat"
        value="mo"
        ${item ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-mo-3"
        >mo</label
      >
    `;
    }).join(``);
  }

  get template() {
    const cardMarkdown = `
  <article class="card card--${this._color} card--edit ${this._isRepeated() ? `card--repeat` : ``}">
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
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">no</span>
            </button>

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

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">no</span>
            </button>

            <fieldset class="card__repeat-days">
              <div class="card__repeat-days-inner">
                ${this._getRepeatingDays()}
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${this._getHashtags()}
            </div>

            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
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

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            <input
              type="radio"
              id="color-black-3"
              class="card__color-input card__color-input--black visually-hidden"
              name="color"
              value="black"
            />
            <label
              for="color-black-3"
              class="card__color card__color--black"
              >black</label
            >
            <input
              type="radio"
              id="color-yellow-3"
              class="card__color-input card__color-input--yellow visually-hidden"
              name="color"
              value="yellow"
            />
            <label
              for="color-yellow-3"
              class="card__color card__color--yellow"
              >yellow</label
            >
            <input
              type="radio"
              id="color-blue-3"
              class="card__color-input card__color-input--blue visually-hidden"
              name="color"
              value="blue"
            />
            <label
              for="color-blue-3"
              class="card__color card__color--blue"
              >blue</label
            >
            <input
              type="radio"
              id="color-green-3"
              class="card__color-input card__color-input--green visually-hidden"
              name="color"
              value="green"
              checked
            />
            <label
              for="color-green-3"
              class="card__color card__color--green"
              >green</label
            >
            <input
              type="radio"
              id="color-pink-3"
              class="card__color-input card__color-input--pink visually-hidden"
              name="color"
              value="pink"
            />
            <label
              for="color-pink-3"
              class="card__color card__color--pink"
              >pink</label
            >
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
  </article>
  `.trim();

    const cardTemplate = document.createElement(`template`);
    cardTemplate.innerHTML = cardMarkdown;
    return cardTemplate.content.cloneNode(true).firstChild;
  }

  get element() {
    return this._element;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
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
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }
}

export {TaskEdit};