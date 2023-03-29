const inputHeight = document.querySelector('.height');
const inputWidth = document.querySelector('.width');
const btn = document.querySelector('button');
const place = document.querySelector('.context');

btn.addEventListener("click", check);

function loadPhoto(photo){
	const cardsBlock =`<img
	src="${photo}"
	style="margin-right: 30px"
  >`;

	place.innerHTML = cardsBlock;
}

	function check(){
		const width = inputWidth.value;
		const height = inputHeight.value;
		
		if((width < 100 || width > 300 || isNaN(width)) || (height < 100 || height > 300 || isNaN(height))){
			console.log('Одно из чисел вне диапазона от 100 до 300');
		}
		else{
			fetch(`https://picsum.photos/${width}/${height}`)
        .then((response) => response.url)
        .then((result) => {
            loadPhoto(result);
            console.log("Фото загружено.");
        })
        .catch((reason) => {
            console.log("Ошибка: " + reason);
        });
		
		}


	}
