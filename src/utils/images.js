function handleFileSelect(fileInput, imageId, stringId, btnId) {
    var file = fileInput.files[0];
    var img = document.createElement("img");
    img.imageId = imageId;
    img.stringId = stringId;
    img.btnId = btnId;
    img.onload = resizeImage;
    img.src = (URL || webkitURL).createObjectURL(file);
}


function resizeImage() {
    var img = this;
    var canvas = document.createElement('canvas');
    var imgstring = document.getElementById(img.stringId);
    var width = img.width;
    var height = img.height;

    var max_width = 976;
    var max_height = 610;

    // calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > max_width) {
            height = Math.round(height *= max_width / width);
            width = max_width;
        }
    } else {
        if (height > max_height) {
            width = Math.round(width *= max_height / height);
            height = max_height;
        }
    }

    if (height > width) {

    }

    // resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    //  ctx.rotate(degrees*Math.PI/90);

    // finally, update
    var converted = document.getElementById(img.imageId);
    converted.src = canvas.toDataURL("image/jpeg", 0.5);
    imgstring.value = converted.src;
    converted.style.display = "inline"; //show the hidden pic  
    converted.style.visibility = "visible";
    converted.style.width = "40%";      // [image].width is read-only
    (URL || webkitURL).revokeObjectURL(this.src);
    clickUpload(img.btnId);
}