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

//default color for trigonometry: tomato
var r = parseInt(document.getElementById('color').value.substring(1, 3), 16);
var g = parseInt(document.getElementById('color').value.substring(3, 5), 16);
var b = parseInt(document.getElementById('color').value.substring(5, 7), 16);
//initial values from ranges
var den = document.getElementById('density').value;
var amp =
  document.getElementById('amplitude').value /
  document.getElementById('amplitude').max;
var gap = document.getElementById('gap').value;
var ceiling_floor = null;

function checkPix(x, y, a, d) {
  if (y < a + (Math.sin((x * Math.PI) / den) * amp * 3 * a) / 4) {
    return true;
  }
  if (y > d - a + (Math.sin((x * Math.PI) / den) * amp * 3 * a) / 4) {
    return true;
  } else {
    return false;
  }
}

function trigonometry_cf() {
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
    ceiling_floor = true;
  }
}

function trigonometry_lr() {
  if (check()) {
    tempImage = new SimpleImage(currentImage);
    var w = tempImage.getWidth();
    for (var pix of tempImage.values()) {
      if (checkPix(pix.getY(), pix.getX(), w / gap, w)) {
        pix.setRed(r);
        pix.setGreen(g);
        pix.setBlue(b);
      }
    }
    tempImage.drawTo(imgcanvas);
    ceiling_floor = false;
  }
}

function changeColor() {
  var hex = document.getElementById('color').value;
  if (check() && checkTemp()) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
    if (ceiling_floor) {
      trigonometry_cf();
    } else if (ceiling_floor === null) {
      alert('Choose a trigonometry option first.');
    } else {
      trigonometry_lr();
    }
  }
}

function changeDensity() {
  if (check() && checkTemp()) {
    den = document.getElementById('density').value;
    if (ceiling_floor) {
      trigonometry_cf();
    } else if (ceiling_floor === null) {
      alert('Choose a trigonometry option first.');
    } else {
      trigonometry_lr();
    }
  }
}

function changeAmp() {
  if (check() && checkTemp()) {
    var sld = document.getElementById('amplitude');
    amp = sld.value / sld.max;
    if (ceiling_floor) {
      trigonometry_cf();
    } else if (ceiling_floor === null) {
      alert('Choose a trigonometry option first.');
    } else {
      trigonometry_lr();
    }
  }
}

function changeGap() {
  if (check() && checkTemp()) {
    gap = document.getElementById('gap').value;
    if (ceiling_floor) {
      trigonometry_cf();
    } else if (ceiling_floor === null) {
      alert('Choose a trigonometry option first.');
    } else {
      trigonometry_lr();
    }
  }
}

function randomInt() {
  return -Math.floor(Math.random() * 10); //maximum 10 pix away to both sides
}

function check_X(w, x, num) {
  if (x + num < 0) {
    num = num + 1;
    return check_X(x, num);
  } else if (x + num >= w) {
    num = num - 1;
    return check_X(x, num);
  } else {
    return num;
  }
}

function check_Y(h, y, num) {
  if (y + num < 0) {
    num = num + 1;
    return check_Y(y, num);
  } else if (y + num >= h) {
    num = num - 1;
    return check_Y(y, num);
  } else {
    return num;
  }
}

function noise() {
  if (check()) {
    tempImage = new SimpleImage(
      currentImage.getWidth(),
      currentImage.getHeight(),
    );
    alert('Noise filter may take some time.');
    var w = currentImage.getWidth();
    var h = currentImage.getHeight();
    for (var pix of tempImage.values()) {
      var x = pix.getX();
      var y = pix.getY();
      if (Math.random() < 0.5) {
        tempImage.setPixel(x, y, currentImage.getPixel(x, y));
      } else {
        var x_away = check_X(w, x, randomInt());
        var y_away = check_Y(h, y, randomInt());
        tempImage.setPixel(x, y, currentImage.getPixel(x + x_away, y + y_away));
      }
    }
    tempImage.drawTo(imgcanvas);
  }
}

function average(img, x, y) {
  var count = 0;
  const pixAway = 3;
  var h = img.getHeight();
  var w = img.getWidth();
  var avgRGB = {
    r: 0,
    g: 0,
    b: 0,
  };

  for (var i = -pixAway; i <= pixAway; i++) {
    for (var m = -pixAway; m <= pixAway; m++) {
      if (!(x + i < 0 || x + i >= w || y + m < 0 || y + m >= h)) {
        avgRGB.r += img.getPixel(x + i, y + m).getRed();
        avgRGB.g += img.getPixel(x + i, y + m).getGreen();
        avgRGB.b += img.getPixel(x + i, y + m).getBlue();
        count += 1;
      }
    }
  }
  avgRGB.r = avgRGB.r / count;
  avgRGB.g = avgRGB.g / count;
  avgRGB.b = avgRGB.b / count;
  return avgRGB;
}

function blurring() {
  //initally named blur but didn't respond to click
  if (check()) {
    tempImage = new SimpleImage(currentImage);
    alert('Blurring may take some time.');

    for (var p of tempImage.values()) {
      var x = p.getX();
      var y = p.getY();
      var avg = average(tempImage, x, y);
      p.setRed(avg.r);
      p.setGreen(avg.g);
      p.setBlue(avg.b);
    }
    tempImage.drawTo(imgcanvas);
  }
}

function fade() {
  if (check()) {
    var degree = 255 - document.getElementById('fade').value;
    tempImage = new SimpleImage(currentImage);
    for (var pix of tempImage.values()) {
      pix.setAlpha(degree);
    }
    tempImage.drawTo(imgcanvas);
  }
}
