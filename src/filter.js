import {Component} from './component';

class Filter extends Component {
  constructor(name, isChecked = false, isDisabled = false) {
    super();
    this._name = name;
    this._isChecked = isChecked;
    this._isDisabled = isDisabled;

    this._onFilter = null;
  }

  get template() {
    const filterMarkup = `
      <input type="radio" id="filter__${this._name.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${this._isChecked ? ` checked` : ``} ${this._isDisabled ? ` disabled` : ``}/>
      <label for="filter__${this._name.toLowerCase()}" class="filter__label"> ${this._name.toUpperCase()} <span class="filter__${this._name.toLowerCase()}-count"></span>
      </label>
    `.trim();

    const filterTemplate = document.createElement(`template`);
    filterTemplate.innerHTML = filterMarkup;
    return filterTemplate.content.cloneNode(true);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }
}

export {Filter};
