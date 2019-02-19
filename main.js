'use strict';

const getFilterElement = (name, amount, isChecked = false, isDisabled = false) =>
  `<input type="radio" id="filter__${name.toLowerCase}"
class="filter__input visually-hidden"
name="filter"
${isChecked ? ` checked` : ``}
${isDisabled ? ` disabled` : ``}/>
<label for="filter__${name.toLowerCase}" class="filter__label">
${name.toUpperCase} <span class="filter__all-count">${amount}</span></label>
`;
