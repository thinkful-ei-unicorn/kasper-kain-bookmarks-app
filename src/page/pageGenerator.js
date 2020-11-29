import store from '../data/localStore';

//#region SPECIFIC GENERATORS AND OBJECTS

const generateMessageBox = function (message, err) {
  let errClass = err ? 'errMessage' : 'message';

  return `
  <p class= "${errClass}">${message}</p>
  `;
};

const generateRatingList = function (ratingIndex) {
  let ul = [];
  for (let i = 0; i < 5; i++) {
    let ratingIcon =
      i >= ratingIndex
        ? '<i class="far fa-star"></i>'
        : '<i class="fas fa-star"></i>';
    ul.push(`<li class="bookmark-star">${ratingIcon}</li>`);
  }

  return `
  <ul class="bookmark-star-rating">
  ${ul.join('')}
  </ul>`;
};

const generateBookmarkItem = function (item) {
  let expandedInfo = item.expanded ? generateExpandedBookmarkItem(item) : '';

  if (item.rating > store.sort) {
    return `
  <li class="bookmark" id="${item.id}">
  <div class="bookmark-titlebar">
  <p>${item.title}</p>
      ${generateRatingList(item.rating)}
  </div>
    ${expandedInfo}
  </l>`;
  } else {
    return '';
  }
};

const generateExpandedBookmarkItem = function (item) {
  return `
  <div class="bookmark-expanded-info">
  <div class="bookmark-button-container">
  <a href="${item.url}" target ="_blank" class="bookmark-visit-button">visit</a>
    <button class="bookmark-delete-button"><i class="far fa-trash-alt"></i></button>
    
  </div>
    <div class="bookmark-page-content">
      <p>${item.desc}</p>
    </div>
  </div>`;
};

const generateBookMark_HTML = function () {
  let bookmarks = [...store.items];
  return bookmarks.map((item) => generateBookmarkItem(item)).join('');
};

//#endregion

//#region PAGE GENERATORS

const generateStateOneHTML = function () {
  return `
    <form class="button-container">
        <input type="button" id="new-item-button" value="new" />
        <select id="sort-item-button">
        <option class="sort-option-button" value="0">Show all</option>
        <option class="sort-option-button" value="1">min = 2</option>
        <option class="sort-option-button" value="2">min = 3</option>
        <option class="sort-option-button" value="3">min = 4</option>
        <option class="sort-option-button" value="4">min = 5</option>
        </select>
    </form>
    <div id="bookmark-container">
        <ul>
            ${generateBookMark_HTML()}
        </ul>
    </div>
    `;
};

const generateStateTwoHTML = function () {
  return `
        <form id="item-custom">
          <div class="button-container">
              <input type="submit" id="add-item-button" value="Create" />
              <input type="button" id="cancel-item-button" value="cancel" />
          </div>
          <div id="new-item-info-container">
            <input type="text" name="item-name" placeholder="Enter title" />
            <input type="text" name="item-URL" placeholder="Enter website URL" />
            <div id="rating-selection>
            <label for="rating">Select Rating</label>
            <input type="number" id= "rating" name="item-rating" max = "5" min = "1" value = "1" />
            </div>
            <textarea name="item-desc" placeholder="Enter description here (optional)" />
          </div>
        </form>
    </div>
    `;
};

const generateStatethreeHTML = function () {
  return `
    <div id="title-screen">
      <p>Bookmark Application Battle Interface</p>
      <div id="title-screen-button-container">
        <button id="audio-toggle-button">Audio On</button>
        <button id ="start-button">Start</button>
      </div>
    </div>
  `;
};

//#endregion

//#region PAGE STATES

const updatePageState = function (index) {
  let content;
  switch (index) {
    case 0:
      content = generateStateOneHTML();
      break;
    case 1:
      content = generateStateTwoHTML();
      break;
    case 2:
      content = generateStatethreeHTML();
      break;
  }
  return content;
};

//#endregion

export default {
  updatePageState,
  generateMessageBox,
};
