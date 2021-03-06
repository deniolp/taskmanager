import {Component} from './component';
import flatpickr from 'flatpickr';
import moment from 'moment';

const DAYS = [
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
  `su`
];
const COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

class TaskEdit extends Component {
  constructor({id, title, dueDate, dueTime,
    tags, picture, color, repeatingDays}) {
    super();
    this._id = id;
    this._title = title;
    this._defaultDate = dueDate;
    this._dueDate = dueDate;
    this._dueTime = dueTime;
    this._tags = tags;
    this._picture = picture;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._state = {
      isDate: dueDate && dueTime,
      isRepeated: this._isRepeated(),
    };

    this._onSubmit = null;
    this._onDelete = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onCheckboxClick = this._onCheckboxClick.bind(this);
    this._onDayofWeekClick = this._onDayofWeekClick.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onTextChange = this._onTextChange.bind(this);
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
          value="${item}"
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

  _renderRepeatingDays() {
    return DAYS.map((key) => {
      return `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${key}-${this._id}"
        name="repeat"
        value="${key}"
        ${this._repeatingDays[key] ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${key}-${this._id}"
        >${key}</label
      >
    `;
    }).join(``);
  }

  _renderColorCheckboxes() {
    return COLORS.map((color) => {
      return `
      <input
              type="radio"
              id="color-${color}-${this._id}"
              class="card__color-input card__color-input--${color} visually-hidden"
              name="color"
              value="${color}" ${this._color === `${color}` && `checked`}
            />
            <label
              for="color-${color}-${this._id}"
              class="card__color card__color--${color}"
              >${color}</label
            >
      `;
    }).join(``);
  }

  get template() {
    const cardMarkup = `
  <article class="card card--${this._color} card--edit ${this._state.isRepeated ? `card--repeat` : ``}">
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
          >${this._title}</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="${moment(this._dueDate).format(`DD MMMM`)}"
                  name="date"
                  value="${moment(this._dueDate).format(`DD MMMM`)}"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="${this._dueTime}"
                  name="time"
                  value="${this._dueTime}"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
              <div class="card__repeat-days-inner">
                ${this._renderRepeatingDays()}
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
          ${this._renderColorCheckboxes()}
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
    cardTemplate.innerHTML = cardMarkup;
    return cardTemplate.content.cloneNode(true).firstChild;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueTime: ``,
      dueDate: ``,
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };
    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }
    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    if (!this._state.isDate) {
      this._dueDate = null;
      this._dueTime = null;
    }
    this._removeListeners();
    this._partialUpdate();
    this._addListeners();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this._removeListeners();
    this._partialUpdate();
    this._addListeners();
  }

  _onCheckboxClick(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {
      this._element.classList.value = `card card--${evt.target.value} card--edit`;
      this._color = evt.target.value;
    }
  }

  _onDayofWeekClick(evt) {
    if (evt.target.tagName.toLowerCase() === `input`) {
      this._repeatingDays[evt.target.value] = evt.target.checked;
    }
  }

  _onDateChange(evt) {
    if (evt.target.tagName.toLowerCase() === `input` && evt.target.classList.contains(`card__date`)) {
      this._dueDate = moment(evt.target.value, `DD MMMM`);
    }
    if (evt.target.tagName.toLowerCase() === `input` && evt.target.classList.contains(`card__time`)) {
      this._dueTime = evt.target.value;
    }
  }

  _onTextChange(evt) {
    this._title = evt.target.value;
  }

  _onDeleteClick() {
    if (typeof this._onDelete === `function`) {
      this._onDelete({id: this._id});
    }
  }

  _addListeners() {
    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__colors-wrap`).addEventListener(`click`, this._onCheckboxClick);
    this._element.querySelector(`.card__repeat-days-inner`).addEventListener(`click`, this._onDayofWeekClick);
    this._element.querySelector(`.card__date-deadline`).addEventListener(`change`, this._onDateChange);
    this._element.querySelector(`.card__text`).addEventListener(`change`, this._onTextChange);
    this._element.querySelector(`.card__delete`).addEventListener(`click`, this._onDeleteClick);
    const dateInputElement = this._element.querySelector(`.card__date`);
    const timeInputElement = this._element.querySelector(`.card__time`);

    if (this._state.isDate) {
      flatpickr(dateInputElement, {
        altInput: true,
        altFormat: `j F`,
        dateFormat: `j F`,
        defaultDate: moment(this._dueDate || new Date()).format(`DD MMMM`),
      });
      flatpickr(timeInputElement, {
        enableTime: true,
        noCalendar: true,
        altInput: true,
        altFormat: `h:i K`,
        dateFormat: `h:i K`,
        defaultDate: this._dueTime || new Date(),
      });
    }
  }

  _removeListeners() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__colors-wrap`).removeEventListener(`click`, this._onCheckboxClick);
    this._element.querySelector(`.card__repeat-days-inner`).removeEventListener(`click`, this._onDayofWeekClick);
    this._element.querySelector(`.card__date-deadline`).removeEventListener(`change`, this._onDateChange);
    this._element.querySelector(`.card__text`).removeEventListener(`change`, this._onTextChange);
    this._element.querySelector(`.card__delete`).removeEventListener(`click`, this._onDeleteClick);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template.innerHTML;
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    if (data.dueDate) {
      this._dueDate = data.dueDate;
    }
    if (data.dueTime) {
      this._dueTime = data.dueTime;
    }
  }

  shake() {
    const ANIMATION_TIMEOUT = 800;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        target.dueDate = moment(value, `DD MMMM`);
      },
      time: (value) => {
        target.dueTime = value;
      }
    };
  }
}

export {TaskEdit};
