const canvas = document.querySelector('.js-canvas');
const canvasStyle = window.getComputedStyle(canvas);
const CANVAS_WIDTH = parseInt(canvasStyle.width, 10);
const CANVAS_HEIGHT = parseInt(canvasStyle.height, 10);
const currentColor = document.querySelector('.js-current-color');
const palette = document.querySelector('.js-palette');
const modeBtn = document.querySelector('.js-mode');

const ctx = canvas.getContext('2d');

const FILL = 'Fill';
const PAINT = 'Paint';

let painting = false;
let filling = false;

function handleModeClick(event) {
    const modeButton = event.target
    if (modeButton.innerHTML == FILL) {
        modeButton.innerHTML = PAINT;
        filling = true;
    } else {
        modeButton.innerHTML = FILL;
        filling = false;
    }
}

function handleMouseDown(event) {
    painting = true;
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function init() {
    canvas.addEventListener('mousedown', handleMouseDown);
    modeBtn.addEventListener('click', handleModeClick);

    Array.from(palette.children).forEach((colorBtn) => {
        colorBtn.addEventListener('click', () => {
            ctx.fillStyle = colorBtn.style.backgroundColor;
            currentColor.style.backgroundColor = ctx.fillStyle;
        });
    });

    const controlRange = document.querySelector('.js-range');
    ctx.lineWidth = controlRange.value;

    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'black';
}

init();