const CLIENT_ID = 'GUEXKUPRYWQ1YCEJIGTOJXVBKTWS2W3DK35O335ICFQZ15GJ';
const CLIENT_SECRET = 'M3II2ON3K4KGR3VWGWFJMBBNZD3NXCNQ01Z1MPFT1IZY0P11';

let venuePhoto;
const att = document.getElementById('att');
const favoriteListKey = 'favorite_list';

const url_api = (city) => `https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210904&near=${city}&limit=20`;
// `https://api.foursquare.com/v2/venues/explore/search?cat=food&near=${city}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

async function getAttractionsByLocation(city) {
  const resp = await fetch(url_api(city));
  const respData = await resp.json();

  console.log(respData);
  addAttractionsToPage(respData.response.venues);
}

const photo_URL = (id) => `https://api.foursquare.com/v2/venues/${id}/photos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20210904&group=venue&limit=10`;

async function getPhotosByAttractions(id) {
  const resp = await fetch(photo_URL(id));
  const respData = await resp.json();

  console.log(respData);

  venuePhoto = `${respData.response.photos.items[0].prefix}100x100${respData.response.photos.items[0].suffix}`;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function saveItem(venue) {
  const bookmarkElement = document.getElementById(venue.id);

  const favoriteList = localStorage.getItem(favoriteListKey);
  if (favoriteList) {
    const items = JSON.parse(favoriteList);
    if (items.length >= 3) {
      items.shift();
    }
    const isVenueExist = items.find((item) => item.id === venue.id);
    if (isVenueExist) {
      const newList = items.filter((item) => item.id !== venue.id);
      localStorage.setItem(favoriteListKey, JSON.stringify(newList));
      bookmarkElement.textContent = '❤️';
      return;
    }
    localStorage.setItem(favoriteListKey, JSON.stringify([...items, venue]));

    bookmarkElement.textContent = '🖤';
  } else {
    localStorage.setItem(favoriteListKey, JSON.stringify([venue]));
  }
}

function getVenue(venueId) {
  const favoriteList = localStorage.getItem(favoriteListKey);
  if (favoriteList) {
    const items = JSON.parse(favoriteList);
    return items.find((item) => item.id === venueId);
  }
  return false;
}

function addAttractionsToPage(venues) {
  const attractions = document.createElement('div');
  attractions.classList.add('attractions');

  for (let i = 0; i < 3; i++) {
    const places = document.createElement('div');
    places.classList.add('places');

    const number = getRandomInt(20);
    const currentVenue = venues[number];
    const src = currentVenue.categories[0].icon.prefix;

    const isVenueBookmarked = getVenue(currentVenue.id);
    const bookmarkButton = document.createElement('button');
    bookmarkButton.classList.add('bookmark');
    bookmarkButton.onclick = () => {
      saveItem(currentVenue);
    };
    bookmarkButton.id = currentVenue.id;
    bookmarkButton.textContent = isVenueBookmarked ? '🖤' : '❤️';

    // getPhotosByAttractions(currentVenue.id);
    // <img src="${venuePhoto}" />
    att.innerHTML = `
    <h3 class="attractions-header">Top Attractions</h3>`;
    places.innerHTML = `
    
    <h3><a class="Name">${currentVenue.name}</a></h3>
    <img src="${src}64.png" />
    <h4>Category - ${currentVenue.categories[0].name}</h4>
    <h4 class="address">Address</h4>
    <h4>${currentVenue.location.formattedAddress}</h4>
    `;
    places.appendChild(bookmarkButton);
    
    attractions.appendChild(places);
    att.appendChild(attractions);
  }
}
