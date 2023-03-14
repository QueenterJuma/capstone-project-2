import likeSrc from '../image/like-icon.png';
import { getAllLikesData } from './api.js';

const sortLike = async () => {
  const data = await getAllLikesData();
  return data.sort((a, b) => a.item_id - b.item_id);
};

const getNumberOfLikes = (item) => {
  if (document.querySelector(`.item[data-index="${item.item_id}"]`)) {
    document.querySelector(`.item[data-index="${item.item_id}"] .number-likes`).textContent = item.likes;
  }
};

const displayItems = async (itemslist) => {
  const itemsContainer = document.getElementById('items');
  itemslist.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item';
    itemElement.setAttribute('data-index', index);
    itemElement.innerHTML = `<img class="item-img" src=${item.url} alt=${item.breeds[0].name} /> <div class="item-description"><p>${item.breeds[0].name}</p><div><img class="like-icon" src=${likeSrc} alt="like" /> <p> <span class ="number-likes" >0</span> likes </p></div> </div><button class="comment-button">comment</button>`;
    itemsContainer.appendChild(itemElement);
  });
  const numberofLikesData = await sortLike();
  if (numberofLikesData.length !== 0) {
    numberofLikesData.forEach((item) => {
      getNumberOfLikes(item);
    });
  }
};

export default displayItems;