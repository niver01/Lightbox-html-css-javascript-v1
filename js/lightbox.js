// -----------------------------------------------------------
// comet: evento load
// -----------------------------------------------------------
const gallery = document.getElementById('gallery');

window.addEventListener('load', () => gallery.classList.add('gallery--active'));

// -----------------------------------------------------------
// comet: gallery, lightbox
// -----------------------------------------------------------

const gallery_item = document.querySelectorAll('.gallery_item'),
	gallery_caption_download = document.querySelectorAll('.gallery_caption_download'),
	lightbox = document.getElementById('lightbox'),
	lightbox_slider = document.getElementById('lightbox_slider'),
	lightbox_slider_nav = document.getElementById('lightbox_slider_nav'),
	// lightbox_fullscreen = document.getElementById('lightbox_fullscreen'),
	lightbox_download = document.getElementById('lightbox_download'),
	lightbox_close = document.getElementById('lightbox_close'),
	lightbox_botton = document.getElementById('lightbox_botton'),
	lightbox_toolbar_counter = document.getElementById('lightbox_toolbar_current'),
	lightbox_toolbar_all = document.getElementById('lightbox_toolbar_all');

/**
 * Guarda las descripciones de todo las imagenes attr (data-descripcion)
 * @type {Array<string>}
 */
let lightbox_descripcion = [];
/**
 * Guarada la ruta de  todas las imagenes attr (data-image)
 * @type {Array<string>}
 */
let lightbox_img = [];
/**
 * Guarda la posición del index
 * @type {number}
 */
let posicionItem = 0;
/**
 * @type {boolean}
 */
let lightboxActive = false;

for (let i = 0; i < gallery_item.length; i++) {
	const element = gallery_item[i],
		elementImg = element.children[0].children[0].children[0].attributes.src.value,
		elementDes = element.children[0].children[1].children[0].innerText;

	element.setAttribute('data-image', elementImg);
	element.setAttribute('data-descripcion', elementDes);

	lightbox_img[i] = elementImg;
	lightbox_descripcion[i] = elementDes;

	gallery_caption_download[i].href = elementImg; // guarda la ruta de imagen
	lightbox_download.setAttribute('download', '');
}

// -----------------------------------------------------------
// comet: eventos click  gallery_item (div)
// -----------------------------------------------------------

for (let i = 0; i < gallery_item.length; i++) {
	const element = gallery_item[i];

	element.addEventListener('click', () => {
		posicionItem = i;
		lightboxActive = true; //
		lightbox_download.href = lightbox_img[posicionItem]; // guarda la ruta actual de la imagen en (href)
		lightbox_download.setAttribute('download', '');

		for (let f = posicionItem; f < lightbox_img.length; f++) {
			if (f === posicionItem) {
				lightbox_slider_nav.append(templateString(f));
				document
					.querySelector('.lightbox_slider_item')
					.classList.add('lightbox_slider_item--active');
			} else lightbox_slider_nav.append(templateString(f));

			if (f === lightbox_img.length - 1) {
				for (let x = 0; x < posicionItem; x++) lightbox_slider_nav.append(templateString(x));
			}
		}

		const lightbox_slider_item = document.querySelectorAll('.lightbox_slider_item'),
			itemLength = lightbox_slider_item.length;

		lightbox_slider_nav.style.width = `${100 * lightbox_slider_item.length}%`;

		// inserta la ultima imagen antes de la primera imagen
		// contenedor se mueve a la izquierda -100%
		if (itemLength > 1) {
			lightbox_slider_nav.insertBefore(
				lightbox_slider_item[itemLength - 1],
				lightbox_slider_item[0]
			);
			lightbox_slider_nav.style.marginLeft = '-100%';
		}

		lightbox_toolbar_counter.textContent = posicionItem + 1;
		lightbox_toolbar_all.textContent = itemLength;

		lightbox.classList.add('lightbox--active'); // muesta el lightbox

		setTimeout(() => {
			lightbox_slider.classList.add('lightbox_slider--active');
			itemLength > 1 ? lightbox_botton.classList.add('lightbox_botton--active') : '';
		}, 1000);

		document
			.querySelectorAll('.lightbox-image_item')
			[posicionItem].classList.add('lightbox-image_item--active');
	});
}

for (let i = 0; i < gallery.children.length; i++) {
	gallery.children[i].addEventListener('click', () => {});
}

// función para crear elemento (li.lightbox_slider_item)
const templateString = (index) => {
	const elm = document.createElement('li'),
		template = `<figure class="lightbox_slider_figure">
                        <img src="${lightbox_img[index]}" alt="">
                        <figcaption>
                            <p class="lightbox_slider_descripcion">${lightbox_descripcion[index]}</p>
                        </figcaption>
                      </figure>`;

	elm.classList.add('lightbox_slider_item');
	elm.innerHTML = template;

	return elm;
};

// -----------------------------------------------------------
// comet: evento click gallery_caption_download
// -----------------------------------------------------------
// gallery_caption_download.forEach((element) => {
// 	element.addEventListener('click', (e) => {
// 		e.stopPropagation();
// 		e.preventDefault();
// 	});
// });

// -----------------------------------------------------------
// comet: evento click  lightbox/lightbox_close
// -----------------------------------------------------------

lightbox_close.addEventListener('click', () => lightboxClose());

lightbox.addEventListener('click', (e) => (e.target.id === 'lightbox' ? lightboxClose() : ''));

// función para cerrar lightbox

const lightboxClose = () => {
	const lightbox_slider_item = document.querySelectorAll('.lightbox_slider_item'),
		lightbox_image_item = document.querySelectorAll('.lightbox-image_item');

	lightbox.classList.remove('lightbox--active'); // oculta el lightbox
	lightbox_slider.classList.remove('lightbox_slider--active');
	lightbox_botton.classList.remove('lightbox_botton--active');

	lightbox_image_item[posicionItem].classList.remove('lightbox-image_item--active');
	lightbox_image.classList.remove('lightbox-image--active');
	lightbox_image.style.bottom = `-${lightbox_image.clientHeight}px`;

	// lightboxActive = false;
	toggleI = true;

	setTimeout(() => {
		for (const item of lightbox_slider_item) {
			item.remove();
		}
	}, 500);

	// return
};

// -----------------------------------------------------------
// comet: evento click lightbox_fullscreen
// -----------------------------------------------------------

// let toggleFullscreen = true;

// lightbox_fullscreen.addEventListener('click', () => {
// 	let pahtImg = '';
// 	const element = document.documentElement;

// 	toggleFullscreen
// 		? (pahtImg = './img/imgicon/icon_full_screen.png')
// 		: (pahtImg = './img/imgicon/icon_normal_screen.png');

// 	if (toggleFullscreen) {
// 		pahtImg = './img/imgicon/icon_normal_screen.png';
// 		if (element.requestFullScreen) {
// 			element.requestFullScreen();
// 		} else if (element.mozRequestFullScreen) {
// 			element.mozRequestFullScreen();
// 		} else if (element.webkitRequestFullScreen) {
// 			element.webkitRequestFullScreen();
// 		}
// 	} else {
// 		pahtImg = './img/imgicon/icon_full_screen.png';
// 		if (document.cancelFullScreen) {
// 			document.cancelFullScreen();
// 		} else if (document.mozCancelFullScreen) {
// 			document.mozCancelFullScreen();
// 		} else if (document.webkitCancelFullScreen) {
// 			document.webkitCancelFullScreen();
// 		}
// 	}

// 	toggleFullscreen = !toggleFullscreen;
// 	lightbox_fullscreen.children[0].attributes.src.textContent = pahtImg;
// });

// -----------------------------------------------------------
// comet: evento click lightbox_download
// -----------------------------------------------------------

// lightbox_download.addEventListener('click', (e) => {
// 	e.preventDefault();
// });

// -----------------------------------------------------------
// comet: lightbox_botton_prev | lightbox_botton_next
// -----------------------------------------------------------

const lightbox_botton_prev = document.getElementById('lightbox_botton-left'),
	lightbox_botton_next = document.getElementById('lightbox_botton-right');

// lightbox_botton_next

lightbox_botton_next.addEventListener('click', () => lightboxNext());

// función lightboxNext
let flatNext = true;

const lightboxNext = () => {
	if (!flatNext) return false;

	flatNext = false;
	const lightbox_slider_item = document.querySelectorAll('.lightbox_slider_item'),
		itemLength = lightbox_slider_item.length - 1,
		lightbox_image_item = document.querySelectorAll('.lightbox-image_item');

	lightbox_slider_nav.classList.add('lightbox_slider_nav--ani');
	lightbox_slider_nav.style.marginLeft = '-200%';

	if (posicionItem === itemLength) {
		lightbox_image_item[itemLength].classList.remove('lightbox-image_item--active');
		lightbox_image_item[0].classList.add('lightbox-image_item--active');
		posicionItem = 0;
	} else {
		lightbox_image_item[posicionItem].classList.remove('lightbox-image_item--active');
		lightbox_image_item[posicionItem + 1].classList.add('lightbox-image_item--active');
		posicionItem++;
	}

	lightbox_slider_item[1].classList.remove('lightbox_slider_item--active');
	lightbox_slider_item[2].classList.add('lightbox_slider_item--active');

	lightbox_toolbar_counter.textContent = posicionItem + 1;
	lightbox_download.href = lightbox_img[posicionItem];
	lightbox_download.setAttribute('download', '');

	setTimeout(() => {
		lightbox_slider_nav.classList.remove('lightbox_slider_nav--ani');

		lightbox_slider_nav.append(lightbox_slider_item[0]);

		lightbox_slider_nav.style.marginLeft = '-100%';
		flatNext = true;
	}, 1000);
	// console.log(posicionItem);
};

// lightbox_botton_prev

lightbox_botton_prev.addEventListener('click', () => lightboxPrev());

// función lightboxPrev
let flatPrev = true;

let lightboxPrev = () => {
	if (!flatPrev) return false;

	flatPrev = false;

	const lightbox_slider_item = document.querySelectorAll('.lightbox_slider_item'),
		itemLength = lightbox_slider_item.length - 1,
		lightbox_image_item = document.querySelectorAll('.lightbox-image_item');

	lightbox_slider_nav.classList.add('lightbox_slider_nav--ani');
	lightbox_slider_nav.style.marginLeft = '0%';

	if (posicionItem === 0) {
		lightbox_image_item[posicionItem].classList.remove('lightbox-image_item--active');
		lightbox_image_item[itemLength].classList.add('lightbox-image_item--active');
		posicionItem = itemLength;
	} else {
		lightbox_image_item[posicionItem].classList.remove('lightbox-image_item--active');
		lightbox_image_item[posicionItem - 1].classList.add('lightbox-image_item--active');
		posicionItem--;
	}

	lightbox_slider_item[1].classList.remove('lightbox_slider_item--active');
	lightbox_slider_item[0].classList.add('lightbox_slider_item--active');

	lightbox_toolbar_counter.textContent = posicionItem + 1;
	lightbox_download.href.textContent = lightbox_img[posicionItem];

	setTimeout(() => {
		lightbox_slider_nav.classList.remove('lightbox_slider_nav--ani');

		lightbox_slider_nav.insertBefore(lightbox_slider_item[itemLength], lightbox_slider_item[0]);

		lightbox_slider_nav.style.marginLeft = '-100%';

		flatPrev = true;
	}, 1000);
};

// -----------------------------------------------------------
// comet:
// -----------------------------------------------------------

const lightbox_image = document.getElementById('lightbox-image'),
	lightbox_image_nav = document.getElementById('lightbox-image_nav'),
	lightbox_image_toggle = document.getElementById('lightbox-image_toggle');

// crea elemtos (figure) de forma dinamica, para insertar lightbox_image_nav

for (const img of lightbox_img) {
	const elem = document.createElement('figure');
	elem.classList.add('lightbox-image_item');
	elem.innerHTML = `<img src="${img}" alt="" srcset="">`;
	lightbox_image_nav.append(elem);
}

let toggleI = true; // variable para mostrar/ocultar lightbox_image
lightbox_image.style.bottom = `-${lightbox_image.clientHeight}px`; // oculta lightbox_image

window.addEventListener('resize', () => {
	lightbox_image.style.bottom = `-${lightbox_image.clientHeight}px`;
	lightbox_image.classList.toggle('lightbox-image--active');
	toggleI = !toggleI;
});

// lightbox_image_toggle

lightbox_image_toggle.addEventListener('click', () => {
	toggleI
		? (lightbox_image.style.bottom = '0')
		: (lightbox_image.style.bottom = `-${lightbox_image.clientHeight}px`);
	toggleI = !toggleI;

	lightbox_image.classList.toggle('lightbox-image--active');
});

// -----------------------------------------------------------
// comet: lightbox - eventos de teclados
// -----------------------------------------------------------

document.addEventListener('keyup', (e) => {
	// console.log(e);
	if (lightboxActive) {
		// esc
		if (e.key === 'Escape') lightboxClose();
		// prev
		if (e.key === 'ArrowLeft') lightboxPrev();
		// next
		if (e.key === 'ArrowRight') lightboxNext();
		// dow
		if (e.key === 'ArrowUp') {
			lightbox_image.classList.add('lightbox-image--active');
			lightbox_image.style.bottom = '0'; // muestra lightbox_image
			toggleI = false;
		}
		// up
		if (e.key === 'ArrowDown') {
			lightbox_image.classList.remove('lightbox-image--active');
			lightbox_image.style.bottom = `-${lightbox_image.clientHeight}px`; // oculta lightbox_image
			toggleI = true;
		}
	}
});
