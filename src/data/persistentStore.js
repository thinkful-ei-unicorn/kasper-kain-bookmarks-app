//import api from '../../old_src/api';
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kkain';

const apiFetch = function (...args) {
  return fetch(...args)
    .then((res) => handleError(res))
    .then((result) => result)
    .catch((error) => {
      console.log(error);
    });
};

function handleError(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = {
      code: `${response.status}`,
      message: `${response.statusText}`,
    };
    return Promise.reject(error);
  }
}

const addItem = function (newItem) {
  let item = JSON.stringify(newItem);
  return apiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: item,
  });
};

const deleteItem = function (id) {
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE',
  });
};
const getAllItems = function () {
  return apiFetch(`${BASE_URL}/bookmarks`);
};

export default {
  deleteItem,
  getAllItems,
  addItem,
};
