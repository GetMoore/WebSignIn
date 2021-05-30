// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


$("#submitBtn").click(function () {
    submitForm();
});

function getOffsetForCentering(doc, text) {
    return (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(text) * doc.internal.getFontSize() / 2);
}

function addTextToDocument(doc, text, yValue, centerText) {

    let alignValue = 'left';
    let offset = 20;

    if (centerText === true)
    {
        offset = getOffsetForCentering(doc, text);
        alignValue = 'center';
    }
    doc.text(offset, yValue, text, { align: alignValue });
}

function addTextToDocument2(doc, text, xValue, yValue, centerText) {

    doc.text(xValue, yValue, text);
}

function getCurrentTimeString() {

    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let timeOfDay = '';
    if (hour > 12)
        timeOfDay = 'PM';
    else
        timeOfDay = 'AM';

    return month + '/' + day + '/' + year + ' ' + (hour % 12) + ':' + minutes + ' ' + timeOfDay;
}

function submitForm() {

    //https://artskydj.github.io/jsPDF/docs/jsPDF.html

    //Get the image from the canvas
    let areaOfConcernCanvas = document.getElementById('myCanvas');
    let areaOfConcernImage = areaOfConcernCanvas.toDataURL("image/png");

    let signatureCanvas = document.getElementById('signatureCanvas');
    let signatureImage = signatureCanvas.toDataURL("image/png");

    let patientName = $("#PatientName").val();
    let selectedPainScale = $("#SelectedPainScale").val();
    let comments = $("#Comments").val();
    let currentDateTimeString = getCurrentTimeString();

    //Create the doc
    doc = new jsPDF({unit: 'px', format: 'a4' });

    doc.setFontSize(12);
    doc.setFontType('bold')
    addTextToDocument(doc, 'MOORE CHIROPRACTIC CLINIC', 20, true);
    addTextToDocument(doc, 'Sign-In Form', 30, true);
    addTextToDocument(doc, 'Dr. Debbie Moore DC LAc      601-749-4939', 40, true);
    addTextToDocument(doc, currentDateTimeString, 50, true);

    doc.setFontType('normal')
    doc.rect(20, 68, 230, 227)
    doc.addImage(areaOfConcernImage, 'PNG', 22, 70, 227, 227, null, 'FAST');
    addTextToDocument2(doc, 'Areas of Pain or Concern', 85, 85, false);

    doc.rect(250, 68, 150, 227);

    addTextToDocument2(doc, 'Pain Level: ' + selectedPainScale, 255, 80, false);
    let commentText = doc.splitTextToSize('Comments: ' + comments, 140);
    addTextToDocument2(doc, commentText, 255, 100, false);

    addTextToDocument(doc, 'Patient Signature: ', 325, false);

    doc.addImage(signatureImage, 'PNG', 100, 310, 227, 25, null, 'FAST');
    doc.line(100, 340, 250, 340) // horizontal line

    var base64pdf = btoa(doc.output());

    $.post('File/UploadFile',
        {
            fileAsBase64: base64pdf,
            patientName: patientName
        }).fail(function () {

        }).done(function () {

        });
}

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

    clearCanvas('signatureCanvas');

    $("#SelectedPainScale").val($("#target option:first").val());
    $('#PatientName').val('');
    $('#Comments').val('');
});

function clearCanvas(canvasId) {
    let canvas = document.getElementById(canvasId);
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

setupImage();

window.addEventListener('load', () => {

    let areasOfConcernCanvas = document.getElementById('myCanvas');
    let signatureCanvas = document.getElementById('signatureCanvas');

    areasOfConcernCanvas.addEventListener('mousedown', startPainting);
    areasOfConcernCanvas.addEventListener('mouseup', stopPainting);
    areasOfConcernCanvas.addEventListener('mousemove', sketch);

    signatureCanvas.addEventListener('mousedown', startPainting);
    signatureCanvas.addEventListener('mouseup', stopPainting);
    signatureCanvas.addEventListener('mousemove', sketch);

});

// Stores the initial position of the cursor
let coord = {x: 0, y: 0 };

// This is the flag that we are going to use to
let paint = false;

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
    coord.x = event.clientX - event.target.offsetLeft;
    coord.y = event.clientY - event.target.offsetTop;
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

function coordIsValid(event) {
    let canvas = document.getElementById(event.target.id);
    if
    (
        coord.x <= 0 ||
        coord.x == canvas.width - 2 ||
        coord.y <= 0 ||
        coord.y == canvas.height - 2
    ) return false;

    //console.log(canvas.width, canvas.height, coord);
}

function sketch(event) {
    if (!paint) return;

    if (coordIsValid(event) == false) {
    stopPainting(event);
        return;
    }

    let canvas = document.getElementById(event.target.id);
    let ctx = canvas.getContext('2d');

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
