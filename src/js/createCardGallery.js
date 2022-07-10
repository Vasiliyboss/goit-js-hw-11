export {createCardGallery};

function createCardGallery(item) { 
    return item.map(img => 
    `<div class="photo-card">
    <a clas="photo_card_link" href='${img.largeImageURL}'>
  <img class="photo-img" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${img.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${img.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${img.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${img.downloads}
    </p>
  </div>
  </a>
</div>`).join('');

};