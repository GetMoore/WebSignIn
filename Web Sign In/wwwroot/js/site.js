// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function setupImage() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    let imgObj = new Image();
    imgObj.src = '/img/Body Img.png';

    imgObj.onload = function () {
    //Draw the image onto the canvas.
    ctx.drawImage(imgObj, 0, 0);
    }
};

$("#clearBtn").click(function () {
    setupImage();
    $("#SelectedPainScale").val($("#target option:first").val());
});

setupImage();

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

window.addEventListener('load', () => {

    //resize(); // Resizes the canvas once the window loads
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', sketch);
    //window.addEventListener('resize', resize);
});

// Resizes the canvas to the available size of the window.
function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

// Stores the initial position of the cursor
let coord = {x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
}

function coordIsValid() {
    let canvas = document.getElementById('myCanvas');

    if
    (
        coord.x <= 0 ||
        coord.x == canvas.width - 2 ||
        coord.y <= 0 ||
        coord.y == canvas.height - 2
    ) return false;

    console.log(canvas.width, canvas.height, coord);
}

function sketch(event) {
    if (!paint) return;

    if (coordIsValid() == false) {
    stopPainting();
        return;
    }

    ctx.beginPath();

    ctx.lineWidth = 3;

    // Sets the end of the lines drawn
    // to a round shape.
    ctx.lineCap = 'round';

    ctx.strokeStyle = 'black';

    // The cursor to start drawing
    // moves to this coordinate
    ctx.moveTo(coord.x, coord.y);



    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    getPosition(event);

    // A line is traced from start
    // coordinate to this coordinate
    ctx.lineTo(coord.x, coord.y);

    // Draws the line.
    ctx.stroke();
}

