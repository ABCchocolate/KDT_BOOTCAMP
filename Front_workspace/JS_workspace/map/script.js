
/* ========================
   script.js
   ======================== */
function renderMap(filteredPlaces = places) {
  const map = document.getElementById('map');
  map.innerHTML = "";

  for (let y = 1; y <= 6; y++) {
    for (let x = 1; x <= 6; x++) {
      const place = filteredPlaces.find(p => p.x === x && p.y === y);
      const div = document.createElement('div');
      div.className = 'place';
      if (place) {
        div.textContent = place.name;
        div.onclick = () => showInfo(place);
      }
      map.appendChild(div);
    }
  }
}

function showInfo(place) {
  const panel = document.getElementById('infoPanel');
  panel.innerHTML = `
    <h2>${place.name}</h2>
    <img class="place-img" src="${place.image}" alt="${place.name}">
    <p><strong>분류:</strong> ${place.category}</p>
    <p>${place.description}</p>
    <button onclick="saveFavorite(${place.id})">♥ 찜하기</button>
  `;
}

function filterCategory(cat) {
  if (cat === '전체') {
    renderMap();
  } else {
    const filtered = places.filter(p => p.category === cat);
    renderMap(filtered);
  }
}

function saveFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('찜 목록에 저장되었습니다!');
  } else {
    alert('이미 찜한 장소입니다.');
  }
}

// 초기 렌더링
renderMap();