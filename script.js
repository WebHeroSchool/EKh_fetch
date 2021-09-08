let userName = getUserName();
let githubAPIURL = 'https://api.github.com/users/';
if (userName !== undefined && userName.trim() != '') {
  let avatar = document.getElementById('avatar');
  let profileDescription = document.getElementById('description');
  let profileLink = document.getElementById('link');
  let currentDateHTML = document.getElementById('date');
  getUser (avatar, profileDescription, profileLink, currentDateHTML);
} else {
  alert('Информация о пользователе не найдена');
} 

function getUserName() {
  let searchURL = window.location.toString();
  let parseURL = searchURL.split('=');
  let name = parseURL[1];
  if (name == undefined) {
    name = 'EvgeniyaKh';
  }
  return name;
}


function getUser (avatar, profileDescription, profileLink, currentDateHTML) {
  const load = document.getElementById('1');
  const loading = new Promise((resolve, redject) => {
    setTimeout(() => {
      resolve(load.classList.add('not_active'));
      redject(console.log('Что-то пошло не так'))
    }, 4000);
  });

  const currentDate = new Promise ((resolve, redject) => {
    setTimeout(() => {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();

      switch (month) {
        case 0: fMonth="января"; break;
        case 1: fMonth="февраля"; break;
        case 2: fMonth="марта"; break;
        case 3: fMonth="апреля"; break;
        case 4: fMonth="мае"; break;
        case 5: fMonth="июня"; break;
        case 6: fMonth="июля"; break;
        case 7: fMonth="августа"; break;
        case 8: fMonth="сентября"; break;
        case 9: fMonth="октября"; break;
        case 10: fMonth="ноября"; break;
        case 11: fMonth="декабря"; break;
      };  

      let dateStr = day + " " + fMonth + " " + year + " года";
      resolve(currentDateHTML.innerHTML = dateStr);
      redject(console.log("Не удалось вычислить дату"));
    }, 4000);
  });

  Promise.all ([loading, currentDate])
    .then (([loadPage, currentDate]) => fetch(githubAPIURL + userName)) 
    .then (res =>  res.json())
    .then (json => {
      if(json.message != undefined) {
        console.log(json.message);
        profileDescription.innerHTML = `Пользователя с ником ${userName} не существует`;
      } else {
        profileDescription.innerHTML =  (json.bio != null) ? json.bio : "Нет данных";
        profileLink.href = json.html_url;
        profileLink.innerText = (json.name != null)? json.name : "Нет данных";
        avatar.src = json.avatar_url;
      }
    })
  .catch(err => console.log('Информация о пользователе не доступна ' + err));
}