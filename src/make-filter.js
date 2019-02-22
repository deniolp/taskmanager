export default (name, amount, isChecked = false, isDisabled = false) => {
  const filterMarkdown = `
    <input type="radio" id="filter__${name.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${isChecked ? ` checked` : ``} ${isDisabled ? ` disabled` : ``}/>
    <label for="filter__${name.toLowerCase()}" class="filter__label"> ${name.toUpperCase()} <span class="filter__${name.toLowerCase()}-count">${amount}</span>
    </label>
`;
  const filterTemplate = document.createElement(`template`);
  filterTemplate.innerHTML = filterMarkdown;
  return filterTemplate.content.cloneNode(true);
};
