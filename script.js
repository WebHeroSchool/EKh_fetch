let body = document.body;
let url = window.location.toString();

function getUsername(url) {
 	let urlSplit = url.split('=');
	let name = urlSplit[1];
	if (name == undefined) {
		name = 'EvgeniyaKh';
	}
 	return name;
}

console.log(getUsername(url));

fetch(`https://api.github.com/users/${getUsername(url)}`)
	.then(res => res.json())
  .then(json => {
    console.log(json.avatar_url);
    console.log(json.name);
    console.log(json.bio);
    console.log(json.html_url);

		let img = new Image();
		img.src = json.avatar_url;
    body.append(img);

    let name = document.createElement('p');
    if (json.name != null) {
      name.innerHTML = json.name;
    } else {
      name.innerHTML = 'Не удалось получить информацию об имени пользователя';
    }

    body.append(name);

    name.addEventListener("click", () => window.location = json.html_url);

    let bio = document.createElement('p');
    if (json.bio != null) {
      bio.innerHTML = json.bio;
    } else {
      bio.innerHTML = 'Не удалось получить информацию о bio пользователя';
    }
    body.append(bio);
  })

  .catch(err => document.body.innerHTML = ('Информация о пользователе недоступна'));
