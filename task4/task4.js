const inputlimit = document.querySelector('.limit');
const inputpage = document.querySelector('.page');
const btn = document.querySelector('button');
const place = document.querySelector('.context');
const photosContainer = document.querySelector('.PhotoContainer');

btn.addEventListener("click", check);
if (loadPhotosFromLocalStorage())
    console.log("Загружены последние просмотренные фото.");

	function loadPhotos(photo) {
		let cards = String();
	
		photo.forEach(item => {
			const cardBlock =     `<div>
									<img
									  src="${item.download_url}"
									  style="width: 200px; margin-right: 30px"
									/>
									<p>${item.author}</p>
								  </div>`;
			cards += cardBlock;
		});
	
		photosContainer.innerHTML = cards;
	}

	function check(){
		const limit = inputlimit.value;
		const page = inputpage.value;
		
		if((limit < 1 && limit > 10 && isNaN(limit)) && (page < 1 && page > 10 && isNaN(page))){
			console.log('Оба числа всне диапазона от 1 до 10');
		}else if(limit < 1 || limit > 10 || isNaN(limit)){
			console.log('Лимит вне диапазона от 1 до 10');
		}else if(page < 1 || page > 10 || isNaN(page)){
			console.log('Страница вне диапазона от 1 до 10');
		}else{
			fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
        .then((response) => response.json())
        .then((json) => {
            loadPhotos(json);
            console.log("Фото загружено.");
			savePhotosToLocalStorage();
        })
        .catch((reason) => {
            console.log("Ошибка: " + reason);
        });
		
		}


	}
	function savePhotosToLocalStorage() {
		localStorage.setItem("last_photos", photosContainer.innerHTML);
	}
	
	function loadPhotosFromLocalStorage() {
		photosContainer.innerHTML = localStorage.getItem("last_photos");
		return  photosContainer.innerHTML.length > 0;
	}
