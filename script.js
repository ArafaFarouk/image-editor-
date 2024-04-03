let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let thermal = document.getElementById("thermal");



let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");

let reset = document.querySelector('span')
let imgBox= document.querySelector('.img-box')

function resetValue(){
    img.style.filter ='none';
    saturate.value ='100';
    contrast.value ='100';
    brightness.value ='100';
    sepia.value ='0';
    grayscale.value ='0';
    blur.value ='0';
    hueRotate.value ='0';
}

window.onload =function(){
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}
upload.onchange = function(){
    resetValue();
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
        img.src = file.result;
    }
}

let filters = document.querySelectorAll("ul li input");
filters.forEach(  filter =>{
    filter.addEventListener('input', function(){

        img.style.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        thermal(${thermal.value}%)
        `
    })
})

download.addEventListener('click', function(){
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    // Set the canvas to the same dimensions as the image
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    context.filter = img.style.filter; // Use the same filter settings
    context.drawImage(img, 0, 0, img.width, img.height);

    // Get the data URL of the image
    let dataUrl = canvas.toDataURL();

    // Create a new download link and click it
    let a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'filtered-image.png';
    a.click();
});

