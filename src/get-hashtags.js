export default (tags) => {
  return tags.map((item) => {
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
};
