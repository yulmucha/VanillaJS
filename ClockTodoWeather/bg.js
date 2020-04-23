const NUMBER_OF_IMAGE = 3
const BODY = document.querySelector("body")

function selectImgNumber() {
    return parseInt(Math.random() * NUMBER_OF_IMAGE) + 1;
}

function paintImage() {
    const IMG = new Image();
    const IMG_NUMBER = selectImgNumber();
    IMG.src = `bg_images/${IMG_NUMBER}.jpg`;
    IMG.classList.add("bg-img");
    
    BODY.appendChild(IMG);
}

function init() {
    paintImage();
}

init();