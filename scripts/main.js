const API_URL = 'https://api.github.com/users/';

// Main
const main = document.querySelector('.main');

// Wrapper
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

// Form
const form = document.createElement('form');
form.classList.add('search-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputValue = Object.fromEntries(new FormData(e.target));

  const response = await fetch(`${API_URL}${inputValue.name}`);

  if (response.ok) {
    const data = await response.json();
    wrapper.appendChild(createCard(data));
    main.appendChild(wrapper);
  } else {
    alert('User not found');
  }
});

// Input
const input = document.createElement('input');
input.classList.add('search-input');
input.setAttribute('name', 'name');
input.setAttribute('placeholder', 'User Login');

// Button
const searchBtn = document.createElement('button');
searchBtn.classList.add('search-button');
searchBtn.setAttribute('type', 'submit');
searchBtn.textContent = 'Search';
searchBtn.addEventListener('click', () => {
  document.querySelector('.wrapper').innerHTML = '';
});

// UI
form.appendChild(input);
form.appendChild(searchBtn);
main.appendChild(form);

// Card
function createCard(profileData) {
  const { avatar_url: avatar, name, location, bio } = profileData;

  // Create Card
  const article = document.createElement('article');
  article.classList.add('card');
  main.appendChild(article);

  // Create image
  const imageUser = document.createElement('img');
  imageUser.classList.add('search-image');
  imageUser.setAttribute('src', avatar);
  imageUser.setAttribute('alt', 'User Photo');

  // Create UserName
  const userName = document.createElement('p');
  userName.classList.add('search-text');
  userName.innerHTML = `<span>${name}</span>`;

  // Create City
  const userCity = document.createElement('p');
  userCity.classList.add('search-text');
  userCity.innerHTML = `<span>${location}</span>`;

  // Create About
  const userAbout = document.createElement('p');
  userAbout.classList.add('search-text');
  userAbout.innerHTML = `<span>${bio}</span>`;

  // Create Delete Button
  const button = document.createElement('button');
  button.classList.add('delete-button');
  button.textContent = 'Delete';
  button.addEventListener('click', () => {
    document.querySelector('.wrapper').innerHTML = '';
  });

  article.appendChild(imageUser);
  article.appendChild(userName);
  article.appendChild(userCity);
  article.appendChild(userAbout);
  article.appendChild(button);

  return article;
}
