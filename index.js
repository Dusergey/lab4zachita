class Tovar{
	constructor(title, brand, price, capacity, oldPrice, img){
		this.title = title
		this.brand = brand
		this.price = price
		this.capacity = capacity
		this.oPrice = oldPrice //в процентах
		this.img = img
	}
}

allTovars = [];
t1 = new Tovar("Пенка очищающая AHA + KAOLIN GEL CLEAN", "Evasion", 2400, "0.5 мл", 2400, "img/1.jpg");
allTovars.push(t1);
t1 = new Tovar("Мицелярная вода Time Machine Water Clean", "Storyderm", 2520, "0.5 мл", 2772, "img/2.jpg");
allTovars.push(t1);
t1 = new Tovar("Гель для умывания Clinic-a Clean", "Storyderm", 2392, "0.5 мл", 2392, "img/3.jpg");
allTovars.push(t1);
t1 = new Tovar("Пенка 3D & COLLAGEN", "Isov (Sorex)", 2308, "0.5 мл", 2308, "img/4.jpg");
allTovars.push(t1);
t1 = new Tovar("Пенка COMPLEX AC BUBBLE CLEANSER", "Isov (Sorex)", 3032, "0.5 мл", 3032, "img/5.jpg");
allTovars.push(t1);
t1 = new Tovar("Энзимный йогурт SOFT ENZYME EMULSION", "Evasion", 4000, "0.5 мл", 4000, "img/6.jpg");
allTovars.push(t1);
t1 = new Tovar("Гель для умывания SKIN HYDRATION CLEANSING GEL", "Isov (Sorex)", 4320, "0.5 мл", 4320, "img/7.jpg");
allTovars.push(t1);
t1 = new Tovar("Пенка SMART FORM PEELING DEEP CLEANSER", "Isov (Sorex)", 3995, "0.5 мл", 3995, "img/8.jpg");
allTovars.push(t1);
/*t1 = new Tovar("Товар id-001", "Isov (Sorex)", 3650, "0.5 мл", 3995, "img/1.jpg");
allTovars.push(t1);
t1 = new Tovar("Товар id-002", "Reandne Pro", 4320, "1 мл", 4320, "img/2.jpg");
allTovars.push(t1);
t1 = new Tovar("Товар id-003", "Cellviderm", 3650, "0.5 мл", 3995, "img/3.jpg");
allTovars.push(t1);
t1 = new Tovar("Товар id-004", "Коллост", 5500, "1 мл", 5500, "img/4.jpg");
allTovars.push(t1);
t1 = new Tovar("Товар id-005", "Linerase", 2900, "1 шт.", 2900, "img/5.jpg");
allTovars.push(t1);
t1 = new Tovar("Товар id-006", "Revofil", 2500, "1 шт.", 2500, "img/6.jpg");
allTovars.push(t1);
t1 = new Tovar("Товар id-006", "Reandne Pro", 2200, "1 пара", 2200, "img/7.jpg");
allTovars.push(t1);*/

chosenVar = -1; // ВЫБОР СВЕРХУ
let selected_caps = []; //ЗДЕСЬ ХРАНЯТСЯ ВЫБРАННЫЕ ОБЪЕМЫ
let selected_brands = []; //ЗДЕСЬ ХРАНЯТСЯ ВЫБРАННЫЕ БРЕНДЫ


const katalog = document.querySelectorAll("#katalog ul li"); // Выбор сверху
for(let i =0; i< katalog.length; i++){
	katalog[i].addEventListener('click', ()=>{
		chosenVar = i;
		console.log(chosenVar);
		
		katalog.forEach((e)=>{
			e.style.backgroundColor = 'white';
			e.style.color = '#212529';
		});
		katalog[i].style.backgroundColor = '#212529';
		katalog[i].style.color = 'white';
	});
}
katalog[0].click();
//ВЫБОР ИЗ БРЕНДОВ
const brands = document.querySelectorAll(".brand_item"); 
const brandsImg = document.querySelectorAll(".brand_item img");
const brandsTitle = document.querySelectorAll(".brand_item p");
for(let i=0; i<brands.length; i++){
	brands[i].addEventListener('click', ()=>{
		if(selected_brands.indexOf(brandsTitle[i].innerHTML) !== -1){ //УДАЛЕНИЕ БРЕНДА ИЗ СПИСКА
			selected_brands.splice(selected_brands.indexOf(brandsTitle[i].innerHTML), 1);
			brandsImg[i].src = "square.png";
		}else{
			selected_brands.push(brandsTitle[i].innerHTML); //ДОБАВЛЕНИЕ БРЕНДА В СПИСОК
			brandsImg[i].src = "check.png";
		}
		fill(allTovars,chosenVar,selected_brands,selected_caps); // Заполнение
	});
}


//ВСЕ ЦЕНЫ
let allPrices = [];
allTovars.forEach((e)=>{
	allPrices.push(e.price);
});

//СЛАЙДЕР
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [Math.min(...allPrices), Math.max(...allPrices)],
    connect: true,
    range: {
        'min': Math.min(...allPrices),
        'max': Math.max(...allPrices)
    }
});
//ЗАПИСЬ ДАННЫХ ИЗ СЛАЙДЕРА

const priceFrom = document.getElementById("priceFrom");
const priceTo = document.getElementById("priceTo");

[x, y] = slider.noUiSlider.get(); //После загрузки страницы
	priceFrom.value = Math.round(x);
	priceTo.value = Math.round(y);
	
slider.noUiSlider.on("slide", ()=>{ // Во время слайда
	[x, y] = slider.noUiSlider.get();
	priceFrom.value = Math.round(x);
	priceTo.value = Math.round(y);
	fill(allTovars,chosenVar,selected_brands,selected_caps); // Заполнение
});
slider.noUiSlider.on("change", ()=>{ // После отпускания слайда
	[x, y] = slider.noUiSlider.get();
	priceFrom.value = Math.round(x);
	priceTo.value = Math.round(y);
	fill(allTovars,chosenVar,selected_brands,selected_caps); // Заполнение
});

//ВЫБОР ИЗ ОБЪЕМОВ
const capacities = document.querySelectorAll(".capacity_item"); 
const capacitiesImg = document.querySelectorAll(".capacity_item img");
const capacitiesTitle = document.querySelectorAll(".capacity_item p");
for(let i=0; i<capacities.length; i++){
	capacities[i].addEventListener('click', ()=>{
		if(selected_caps.indexOf(capacitiesTitle[i].innerHTML) !== -1){ //УДАЛЕНИЕ ОБЪЁМА ИЗ СПИСКА
			selected_caps.splice(selected_caps.indexOf(capacitiesTitle[i].innerHTML), 1);
			capacitiesImg[i].src = "square.png";
		}else{
			selected_caps.push(capacitiesTitle[i].innerHTML); //ДОБАВЛЕНИЕ ОБЪЁМА В СПИСОК
			capacitiesImg[i].src = "check.png";
		}
		fill(allTovars,chosenVar,selected_brands,selected_caps); // Заполнение
	});
}

//ЗАПОЛНЕНИЕ КОНТЕНТА
const sell_items = document.getElementById("sell-items");

function fill(allTovars, chosenVar, selected_brands, selected_caps){
	selectedItems = []; //ОТФИЛЬТРОВАННЫЕ ТОВАРЫ

	selected_brands.forEach((b)=>{ //ПРОВЕРКА БРЕНДОВ
		allTovars.forEach((t)=>{
			if(b == t.brand && selectedItems.indexOf(t)===-1){
				selectedItems.push(t);
			}
		});
	});
	
	if(selected_brands.length === 0){
		selectedItems = allTovars;
	}
	
	selectedItems2 = [];
	if(selected_caps.length !== 0){ //ПРОВЕРКА ОБЬЁМА
		selected_caps.forEach((c)=>{
			selectedItems.forEach((t)=>{
				if(c == t.capacity){
					selectedItems2.push(t);
				}
			});
		});
	}else{
		selectedItems2 = selectedItems;
	}
	
	selectedItems3 = []; //ПРОВЕРКА ЦЕНЫ
	selectedItems2.forEach((e)=>{
		if(e.price >= priceFrom.value && e.price <= priceTo.value){
			selectedItems3.push(e);
		}
	});
	
	let contentHTML = "";
	if(selectedItems3.length < 3){
		sell_items.style.alignItems = 'flex-start';
	}else{
		sell_items.style.alignItems = '';
	}
	selectedItems3.forEach((e)=>{
		contentHTML += `<div class="sell-item">
							<div class="heart"><img src="heart.png"></div> 
							<img class="mainImg" src="${e.img}">
							<p>${e.title}</p>`;
							if(e.price != e.oPrice){
								contentHTML += `<p>${e.price} ₽ <del>${e.oPrice} ₽</del></p>`;
							}else{
								contentHTML += `<p>${e.price} ₽</p>`;
							}
							contentHTML+=`<a>В корзину</a>
						</div>`;
	});
	sell_items.innerHTML = contentHTML;
}
let contentHTML = "";
allTovars.forEach((e)=>{
		contentHTML += `<div class="sell-item">
							<div class="heart"><img src="heart.png"></div> 
							<img class="mainImg" src="${e.img}">
							<p>${e.title}</p>`;
							if(e.price != e.oPrice){
								contentHTML += `<p>${e.price} ₽ <del>${e.oPrice} ₽</del></p>`;
							}else{
								contentHTML += `<p>${e.price} ₽</p>`;
							}
							contentHTML+=`<a>В корзину</a>
						</div>`;
	});
	sell_items.innerHTML = contentHTML;
