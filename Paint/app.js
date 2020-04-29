const canvas = document.querySelector('.js-canvas');
const canvasStyle = window.getComputedStyle(canvas);
const CANVAS_WIDTH = parseInt(canvas.getAttribute('width'));
const CANVAS_HEIGHT = parseInt(canvas.getAttribute('height'));
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
    } else {
        const { offsetX, offsetY } = event;
        ctx.beginPath();
        moveTo(offsetX, offsetY);
    }
}

function handleMouseMove(event) {
    if (painting) {
        const { offsetX, offsetY } = event;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    }
}

function handleMouseUp() {
    painting = false;
    ctx.closePath();
}

function init() {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    modeBtn.addEventListener('click', handleModeClick);

    Array.from(palette.children).forEach((colorBtn) => {
        colorBtn.addEventListener('click', () => {
            const selectedColor = colorBtn.style.backgroundColor;
            ctx.fillStyle = selectedColor;
            ctx.strokeStyle = selectedColor;
            currentColor.style.backgroundColor = selectedColor;
        });
    });

    const controlRange = document.querySelector('.js-range');
    ctx.lineWidth = controlRange.value;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'black';
}

init();