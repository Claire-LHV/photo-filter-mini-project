const imgcanvas = document.getElementById('can');
var originalImage;
var currentImage;
var tempImage;

function upload() {
  var fileinput = document.getElementById('uploadimage');
  originalImage = new SimpleImage(fileinput);
  currentImage = new SimpleImage(fileinput);
  currentImage.drawTo(imgcanvas);
}

function check() {
  if (currentImage == null || !currentImage.complete()) {
    alert('Filter cannot be applied till image is successfully uploaded.');
    return false;
  } else {
    return true;
  }
}

function checkTemp() {
  if (tempImage == null || !tempImage.complete()) {
    alert('No filter has been applied.');
    return false;
  } else {
    return true;
  }
}

function BnW() {
  if (check()) {
    //view filter on currentImage
    tempImage = new SimpleImage(currentImage); //immutable
    //var image = originalImage; mutable
    for (var pixl of tempImage.values()) {
      var avg = (pixl.getRed() + pixl.getBlue() + pixl.getGreen()) / 3;
      pixl.setRed(avg);
      pixl.setGreen(avg);
      pixl.setBlue(avg);
    }
    tempImage.drawTo(imgcanvas);
    //check mutability
    //setTimeout(function(){ originalImage.drawTo(imgcanvas); }, 2000);
  }
}

function rainbow_v() {
  if (check()) {
    //view filter on current Image
    tempImage = new SimpleImage(currentImage);

    var wid = tempImage.getWidth();
    for (var pixl of tempImage.values()) {
      var avg = (pixl.getRed() + pixl.getBlue() + pixl.getGreen()) / 3;
      if (pixl.getX() <= wid / 7) {
        makeRed(pixl, avg);
      } else if (pixl.getX() <= (wid * 2) / 7) {
        makeOrange(pixl, avg);
      } else if (pixl.getX() <= (wid * 3) / 7) {
        makeYellow(pixl, avg);
      } else if (pixl.getX() <= (wid * 4) / 7) {
        makeGreen(pixl, avg);
      } else if (pixl.getX() <= (wid * 5) / 7) {
        makeBlue(pixl, avg);
      } else if (pixl.getX() <= (wid * 6) / 7) {
        makeIndigo(pixl, avg);
      } else {
        makeViolet(pixl, avg);
      }
    }
    tempImage.drawTo(imgcanvas);
  }
}

function rainbow_h() {
  if (check()) {
    //view filter on current Image
    tempImage = new SimpleImage(currentImage);
    var hei = tempImage.getHeight();
    for (var pixl of tempImage.values()) {
      var avg = (pixl.getRed() + pixl.getBlue() + pixl.getGreen()) / 3;
      if (pixl.getY() <= hei / 7) {
        makeRed(pixl, avg);
      } else if (pixl.getY() <= (hei * 2) / 7) {
        makeOrange(pixl, avg);
      } else if (pixl.getY() <= (hei * 3) / 7) {
        makeYellow(pixl, avg);
      } else if (pixl.getY() <= (hei * 4) / 7) {
        makeGreen(pixl, avg);
      } else if (pixl.getY() <= (hei * 5) / 7) {
        makeBlue(pixl, avg);
      } else if (pixl.getY() <= (hei * 6) / 7) {
        makeIndigo(pixl, avg);
      } else {
        makeViolet(pixl, avg);
      }
    }
    tempImage.drawTo(imgcanvas);
  }
}

function applyFilter() {
  //apply currently applied filter by
  if (check() && checkTemp()) {
    //setting currentImage to tempImage
    currentImage = new SimpleImage(tempImage);
  }
}
function removeFilter() {
  //removed current filter that is not applied
  if (check() && checkTemp()) {
    //set tempImage to currentImage
    tempImage = new SimpleImage(currentImage);
    tempImage.drawTo(imgcanvas);
  }
}

function reset() {
  if (check() && checkTemp()) {
    tempImage = new SimpleImage(originalImage);
    currentImage = new SimpleImage(originalImage);
    originalImage.drawTo(imgcanvas);
  }
}

function makeRed(pix, avg) {
  if (avg < 128) {
    pix.setRed(2 * avg);
    pix.setGreen(0);
    pix.setBlue(0);
  } else {
    pix.setRed(255);
    pix.setGreen(2 * avg - 255);
    pix.setBlue(2 * avg - 255);
  }
}

function makeOrange(pix, avg) {
  if (avg < 128) {
    pix.setRed(2 * avg);
    pix.setGreen(0.8 * avg);
    pix.setBlue(0);
  } else {
    pix.setRed(255);
    pix.setGreen(1.2 * avg - 51);
    pix.setBlue(2 * avg - 255);
  }
}

function makeYellow(pix, avg) {
  if (avg < 128) {
    pix.setRed(2 * avg);
    pix.setGreen(2 * avg);
    pix.setBlue(0);
  } else {
    pix.setRed(255);
    pix.setGreen(255);
    pix.setBlue(2 * avg - 255);
  }
}

function makeGreen(pix, avg) {
  if (avg < 128) {
    pix.setRed(0);
    pix.setGreen(2 * avg);
    pix.setBlue(0);
  } else {
    pix.setRed(2 * avg - 255);
    pix.setGreen(255);
    pix.setBlue(2 * avg - 255);
  }
}

function makeBlue(pix, avg) {
  if (avg < 128) {
    pix.setRed(0);
    pix.setGreen(0);
    pix.setBlue(2 * avg);
  } else {
    pix.setRed(2 * avg - 255);
    pix.setGreen(2 * avg - 255);
    pix.setBlue(255);
  }
}

function makeIndigo(pix, avg) {
  if (avg < 128) {
    pix.setRed(0.8 * avg);
    pix.setGreen(0);
    pix.setBlue(2 * avg);
  } else {
    pix.setRed(1.2 * avg - 51);
    pix.setGreen(2 * avg - 255);
    pix.setBlue(255);
  }
}

function makeViolet(pix, avg) {
  if (avg < 128) {
    pix.setRed(1.6 * avg);
    pix.setGreen(0);
    pix.setBlue(1.6 * avg);
  } else {
    pix.setRed(0.4 * avg + 153);
    pix.setGreen(2 * avg - 255);
    pix.setBlue(0.4 * avg + 153);
  }
}

var r = 255; //default color for trigonometry: tomato
var g = 99;
var b = 71;
var den = 120; //all initial value of ranges
var amp = 1;
var gap = 6;

function checkPix(x, y, a, h) {
  if (y < a + (Math.sin((x * Math.PI) / den) * amp * 3 * a) / 4) {
    return true;
  }
  if (y > h - a + (Math.sin((x * Math.PI) / den) * amp * 3 * a) / 4) {
    return true;
  } else {
    return false;
  }
}

function trigonometry() {
  if (check()) {
    tempImage = new SimpleImage(currentImage);
    var h = tempImage.getHeight();
    for (var pix of tempImage.values()) {
      if (checkPix(pix.getX(), pix.getY(), h / gap, h)) {
        pix.setRed(r);
        pix.setGreen(g);
        pix.setBlue(b);
      }
    }
    tempImage.drawTo(imgcanvas);
  }
}

function changeColor() {
  var hex = document.getElementById('color').value;
  if (check() && checkTemp()) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
    trigonometry();
  }
}

function changeDensity() {
  if (check() && checkTemp()) {
    den = document.getElementById('density').value;
    trigonometry();
  }
}

function changeAmp() {
  if (check() && checkTemp()) {
    var sld = document.getElementById('amplitude');
    amp = sld.value / sld.max;
    trigonometry();
  }
}

function changeGap() {
  if (check() && checkTemp()) {
    gap = document.getElementById('gap').value;
    trigonometry();
  }
}

function noise() {}

function blur() {}
